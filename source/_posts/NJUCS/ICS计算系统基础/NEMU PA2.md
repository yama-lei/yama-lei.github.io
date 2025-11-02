---
title: NEMU PA0
date: 2025-10-10 08:39:27
categories:
  - NJUCS
  - ICS计算系统基础
article: false
"":
created: 2025-10-10T08:39
updated: 2025-10-29T22:00
---



## 实验过程记录
### RTFC（riscv指令实现）
在实现了基本的整数指令之后，尝试运行dummy测试，但是出现了bug
```text
riscv32-nemu-interpreter: src/utils/disasm.c:65: disassemble: Assertion `count == 1' failed.
```
经过加入调试信息后发现，在执行jal指令的时候出现了错误

![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251011153304.png)


查看jal指令的实现，仔细比对，发现没有错误，在询问ai之后发现：
```
#define immJ() do { *imm = (SEXT(BITS(i, 31,31), 1) << 19) | BITS(i, 30, 21)    | BITS(i,20,20) << 10 | BITS(i,19,12) <<11 ;} while(0)

#define immB() do { *imm = (SEXT(BITS(i, 31,31), 1) << 11) | BITS(i, 30, 25)<<4 | BITS(i,11,8)        | BITS(i,7,7) <<10 ;} while(0)
```
这里的立即数出错了，因为B和J型指令在跳转的时候，隐含了最后一位0。但是修复这个错误之后，代码还是报错，于是加入更加详细的调试：
尴尬的是，我刚刚做的是am-tests而不是cpu-tests。。。

重新回到测试中，这一次我终于找到了问题：
1. 上面的移位的确有问题： 通过比较我代码的调试信息和disassemble的结果进行对比，我发现确实需要额外唯一一位
2. 在B和J型指令中，需要更新的是s->dnpc，而非s->pc
修正之后，出现了：
![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251011182638.png)

发现是ebreak指令执行之后出现了NEMU TRAP的问题，检查发现，在执行ebreak指令的时候，会调用set_nemu_state函数，设置halt_ret的值，因此，加入调试信息发现：
```cpp
[src/isa/riscv32/inst.c:114 decode_exec] PC: 0x80000030         Instruction: 0x00100073   Match: ebreak         Type: N
halt_ret: -2147483592
[src/cpu/cpu-exec.c:124 cpu_exec] nemu: HIT BAD TRAP at pc = 0x80000030
```
进一步地调试发现，jalr指令多跳转了一步，查看代码发现，我在跳转的时候，把s->dnpc+=imm,但是dnpc本身在前面取操作数的时候就已经+=4了，因此这里不应该额外加这个4，改为
s->dnpc=s->pc+imm;
再次执行指令，成功实现Good Trap！
![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251012083305.png)

---
接着测试所有的代码：
![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251012083441.png)

发现原来是B型指令又出错了：
```cpp
INSTPAT("??????? ????? ????? 000 ????? 11000 11", beq    , S, if(src1==src2){s->pc+=imm;});

  INSTPAT("??????? ????? ????? 001 ????? 11000 11", bne    , S, if(src1!=src2){s->pc+=imm;});

  INSTPAT("??????? ????? ????? 100 ????? 11000 11", blt    , S, if(src1<src2){s->pc+=imm;});

  INSTPAT("??????? ????? ????? 101 ????? 11000 11", bge    , S, if(src1>=src2){s->pc+=imm;});
```
这里应该修改和维护的是dnpc!
更加幽默的是，我因为复制粘贴的原因，现在B型指令使用的是S型立即数.......
修改之后还是没能通过其他的样例，选择其中一项进行检查，发现程序进入了halt分支：
```cpp
800000fc <halt>:
800000fc:       00050513                mv      a0,a0
80000100:       00100073                ebreak
80000104:       0000006f                j       80000104 <halt+0x8>
```
进入halt说明check段出现了问题：
```cpp
80000010 <check>:
80000010:       00050463                beqz    a0,80000018 <check+0x8>
80000014:       00008067                ret
80000018:       ff010113                addi    sp,sp,-16
8000001c:       00100513                li      a0,1
80000020:       00112623                sw      ra,12(sp)
80000024:       0d8000ef                jal     800000fc <halt>
```

查看add.c的源代码，原来是我的指令实现错误，导致执行的结果不一致。
于是我做了一个add的小规模测试，把循环改为了1次，只计算0+0，此时正确，当我把代码
，但是在计算0+1的时候就出错了，于是重写了一个测试加法的程序，不使用for 循环：
```cpp
    check(add(test_data[0], test_data[0]) == ans[ans_idx++]);
    check(add(test_data[0], test_data[1]) == ans[ans_idx++]);
    check(add(test_data[0], test_data[2]) == ans[ans_idx++]);
    check(add(test_data[0], test_data[3]) == ans[ans_idx++]);
    check(add(test_data[0], test_data[4]) == ans[ans_idx++]);
    check(add(test_data[0], test_data[5]) == ans[ans_idx++]);
    check(add(test_data[0], test_data[6]) == ans[ans_idx++]);
    check(add(test_data[0], test_data[7]) == ans[ans_idx++]);
```
发现**NEMU_PASS**,说明问题在for循环！
再写一个空的for循环发现也没有任何的问题。
怀疑是数组访问的问题，写了一个数组检测的测试代码，没有任何问题。

---
后来反复尝试发现，使用test_data为01的时候是正确的，但是使用test_data为012的时候错误？


查看汇编代码，发现在循环只有2* 2次的时候汇编代码是：
```ass

80000060:       fb1ff0ef                jal     80000010 <check>
......
80000078:       f99ff0ef                jal     80000010 <check>
......
80000088:       f89ff0ef                jal     80000010 <check>
......
8000009c:       f75ff0ef                jal     80000010 <check>

```
但是当循环为3* 3次的时候得到的汇编代码风格不太一样，出现了bne指令，因此我的指令还是有问题。

接着排查出现的错误：
- lui指令重复左移（取imm的时候已经左移了）
- 在jalr指令中，没有清理低位，需要添加“& ~1”的操作
- 在slt等指令里面没有吧src1改为signed形。**因为src是word_t类型的！**
- slli等指令没有吧shift取低5位！
- ......


此外，有一个指令我卡了半个多月，期间请教了GPT老师也没有解决，最后的方法是

---
> Bug 真多，记不下来。。。。
---


**补充：在后面才发现。。原来有一个叫做riscv-test-am的东西可以直接检查指令实现的正确与否**
### 程序, 运行时环境与AM

#####  实现字符串处理函数
根据需要实现`abstract-machine/klib/src/string.c`中列出的字符串处理函数, 让`cpu-tests`中的测试用例`string`可以成功运行. 关于这些库函数的具体行为, 请务必RTFM.

这一部分在写的时候没有过多地记录，只记得有很多我没想到的corner case。

第一次实现之后发现测试样例还是死活通过不了，通过把string.c的检查点拆开之后，发现strcat，strcpy，strcmp组合的一个check点没有通过。看手册也没有找到错误，最后让GPT老师帮我看了一下缺了什么，比如XX地方的return value有误，etc。
#####  实现sprintf

实现`abstract-machine/klib/src/stdio.c`中的`sprintf()`, 具体行为可以参考`man 3 printf`. 目前你只需要实现`%s`和`%d`就能通过`hello-str`的测试了, 其它功能(包括位宽, 精度等)可以在将来需要的时候再自行实现.

使用stdarg获取到参数，在读取fmt字符串的时候，如果读取到%时，需要考虑是否为格式化字符串，目前只要求实现%s和%d，难度不大，实现完成之后，成功通过hello-str的测试。
> 可以复用vsprintf, vnsprintf等函数，实际上只需要实现vnsprintf一个就行，需要注意截断操作。比如考虑如下程序
> ```c
> snprintf(dst,10,"Hello, %s","Alice")
> ```
> 会发生截断，按照man 3 snprintf的说法，应该只写入n-1个visible char，最后一个char是`\0`



#####  stdarg是如何实现的?

`stdarg.h`中包含一些获取函数调用参数的宏, 它们可以看做是调用约定中关于参数传递方式的抽象. 不同ISA的ABI规范会定义不同的函数参数传递方式, 如果让你来实现这些宏, 你会如何实现?

查看stdarg.h，发现之前的va_start, va_arg等等都是用宏来实现的。
比如`#define va_start(v, ...)   __builtin_va_start(v, 0)`
va_start调用了c内置函数，其中`void __builtin_va_start(va_list ap, last_param);`
原来问的是怎么实现ISA的ABI宏是吗？用一个valist变量来传递？规定好每一个ISA的参数类型，然后在框架代码里面传递valist即可。（我猜）

###  基础设施(2)

#####  实现iringbuf

根据上述内容, 在NEMU中实现iringbuf. 你可以按照自己的喜好来设计输出的格式, 如果你想输出指令的反汇编, 可以参考itrace的相关代码; 如果你不知道应该在什么地方添加什么样的代码, 你就需要RTFSC了.


在cpu-exec.c中实现iringbuf，期间出现多次的buffer overflow现象，检查后发现是这里出现了错误 `strncpy(iringbuf[(cur_iringbuf_idx++)],s->logbuf,128);`
cur_iringbuf_idx用于指示当前的节点，但是忘记取余了，导致缓冲区溢出。
然后再在程序失败的时候执行show_iringbuf即可，我放在了之前程序失败打印寄存器状态的位置
#####  实现mtrace

这个功能非常简单, 你已经想好如何实现了: 只需要在`paddr_read()`和`paddr_write()`中进行记录即可. 你可以自行定义mtrace输出的格式.


先在nemu/Kconfig里面添加有关配置选项（顺便把ftrace也给加上）。
但是我犯了一个错误：我以为Kconfig里面生成的就是直接的宏，于是我在代码里面写的是
```c
#ifdef MTRACE
#endif
```
实际上应该写`CONFIG_MTRACE`.

#####  消失的符号

我们在`am-kernels/tests/cpu-tests/tests/add.c`中定义了宏`NR_DATA`, 同时也在`add()`函数中定义了局部变量`c`和形参`a`, `b`, 但你会发现在符号表中找不到和它们对应的表项, 为什么会这样? 思考一下, 什么才算是一个符号(symbol)?

> 刚好理论课学到链接这😂

只有全局变量和函数才是符号（需要分配一个固定的、全局内存），函数的局部变量以及参数，以栈或者寄存器的方式存储，不是符号。而NR_DATA是一个宏，在预处理的时候就被展开了，自然不是符号。
#####  寻找"Hello World!"

在Linux下编写一个Hello World程序, 编译后通过上述方法找到ELF文件的字符串表, 你发现"Hello World!"字符串在字符串表中的什么位置? 为什么会这样?

>~~幸亏我PA写得慢~~

![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251029215935.png)
如图，在.rodata段，因为字符串是只读的，因此存储在.rodata段。
#####  实现ftrace

根据上述内容, 在NEMU中实现ftrace. 你可以自行决定输出的格式. 你需要注意以下内容:

- 你需要为NEMU传入一个ELF文件, 你可以通过在`parse_args()`中添加相关代码来实现这一功能
- 你可能需要在初始化ftrace时从ELF文件中读出符号表和字符串表, 供你后续使用
- 关于如何解析ELF文件, 可以参考`man 5 elf`
- 如果你选择的是riscv32, 你还需要考虑如何从`jal`和`jalr`指令中正确识别出函数调用指令和函数返回指令

注意, 你不应该通过`readelf`等工具直接解析ELF文件. 在真实的项目中, 这个方案确实可以解决问题; 但作为一道学习性质的题目, 其目标是让你了解ELF文件的组织结构, 使得将来你在必要的时候(例如在裸机环境中)可以自己从中解析出所需的信息. 如果你通过`readelf`等工具直接解析ELF文件, 相当于自动放弃训练的机会, 与我们设置这道题目的目的背道而驰.


#####  不匹配的函数调用和返回

如果你仔细观察上文`recursion`的示例输出, 你会发现一些有趣的现象. 具体地, 注释(1)处的`ret`的函数是和对应的`call`匹配的, 也就是说, `call`调用了`f2`, 而与之对应的`ret`也是从`f2`返回; 但注释(2)所指示的一组`call`和`ret`的情况却有所不同, `call`调用了`f1`, 但却从`f0`返回; 注释(3)所指示的一组`call`和`ret`也出现了类似的现象, `call`调用了`f1`, 但却从`f3`返回.

尝试结合反汇编结果, 分析为什么会出现这一现象.


#####  冗余的符号表

在Linux下编写一个Hello World程序, 然后使用`strip`命令丢弃可执行文件中的符号表:

```
gcc -o hello hello.c
strip -s hello
```

用`readelf`查看hello的信息, 你会发现符号表被丢弃了, 此时的hello程序能成功运行吗?

目标文件中也有符号表, 我们同样可以丢弃它:

```
gcc -c hello.c
strip -s hello.o
```

用`readelf`查看hello.o的信息, 你会发现符号表被丢弃了. 尝试对hello.o进行链接:

```
gcc -o hello hello.o
```

你发现了什么问题? 尝试对比上述两种情况, 并分析其中的原因.


#####  如何生成native的可执行文件

阅读相关Makefile, 尝试理解`abstract-machine`是如何生成`native`的可执行文件的.

#####  奇怪的错误码

为什么错误码是`1`呢? 你知道`make`程序是如何得到这个错误码的吗?




不过和最后只输出一次的iringbuf不同, 程序一般会执行很多访存指令, 这意味着开启mtrace将会产生大量的输出, 因此最好可以在不需要的时候关闭mtrace. 噢, 那就参考一下itrace的相关实现吧: 尝试在Kconfig和相关文件中添加相应的代码, 使得我们可以通过menuconfig来打开或者关闭mtrace. 另外也可以实现mtrace输出的条件, 例如你可能只会关心某一段内存区间的访问, 有了相关的条件控制功能, mtrace使用起来就更加灵活了.
#### difftest
在difftest_step函数中有一个局部变量ref_r，之后调用ref_difftest_regcpy来给这个cpu state进行赋值(把ref的pc值和寄存器值保存在ref_r中)。
之后调用  `checkregs(&ref_r, pc);`来实现最后一步，检查寄存器和pc是否相同。
为了确定我的cppu实现是否和框架代码是一致的（也就是在copy的时候会不会出现错误），尝试查找源代码。
上诉中复制cpu state的函数通过dlsym进行加载`  ref_difftest_regcpy = dlsym(handle, "difftest_regcpy");`
函数是在运行时动态链接形成的，对应的源代码在tools/difftest下面，发现其中核心的函数是
```c
void sim_t::diff_get_regs(void* diff_context) {

  struct diff_context_t* ctx = (struct diff_context_t*)diff_context;

  for (int i = 0; i < NR_GPR; i++) {

    ctx->gpr[i] = state->XPR[i];

  }

  ctx->pc = state->pc;

}
```
因此只需要比较XPR和gpr的定义是否相同就行。
发现XPR是一个  `regfile_t`类（在decode.h)：regfile_t<reg_t, NXPR, true> XPR;
而在这个类中的operator[]操作中
```c
  const T& operator [] (size_t i) const
  {
    return data[i];
  }
```
数据来自data，data就是一个数组，在XPR中类型诶uint64_t，

> 偶然间发现spike的源文件里面有一些之前实现过的内容


框架代码已经基本实现了difftest的功能，我们需要做的就是实现`isa_difftest_checkregs()`函数。


在实现这个函数的时候犯了一个错误，在比较pc的时候，应该是比较ref_r->pc和cpu.pc，而不是将cpu.pc和pc进行比较。
## 必答题
下面是PA实验报告的必答题。
### 立即数背后的故事

**大端和小端**
Motorola 68k系列的处理器都是大端架构的. 现在问题来了, 考虑以下两种情况:

- 假设我们需要将NEMU运行在Motorola 68k的机器上(把NEMU的源代码编译成Motorola 68k的机器码)
- 假设我们需要把Motorola 68k作为一个新的ISA加入到NEMU中

在这两种情况下, 你需要注意些什么问题? 为什么会产生这些问题? 怎么解决它们?
回答：需要注意内存的读取方式。如果是在Motorola 68k上面运行NEMU，可以将NEMU按照大端的方式进行编译（也就是需要先找一个big endian的machine，然后在上面编译，或者直接在Motorola上面编译）。
如果是要把Motorola作为一个新的ISA的话，需要在读取了客户程序的时候把对任何超过1byte的地址读取都转换为小端兼容的方式。
**如何在riscv中读取32位的立即数？**
mips32和riscv32的指令长度只有32位, 因此它们不能像x86那样, 把C代码中的32位常数直接编码到一条指令中. 思考一下, mips32和riscv32应该如何解决这个问题?
解决方案：用两个指令一起解决这个问题，先lui(load upper imm20)把高位的20个字符移动到目标寄存器中，低位补0，再用addi指令，把低12位imm12加入到对应的寄存器中即可。

### 请整理一条指令在NEMU中的执行过程.
在execute函数中，会调用n次exec_once函数，传入当前的pc和一个Decode结构体，在exec_once中维护了pc的值，然后指令执行的核心在isa_exec_once函数中。
**Instruction Fetch:**
调用inst_fetch来从内存中读取指令，并且更新s->snpc的值（自动更新）

**Instrction Decode**
将读取的指令(s->inst)和定义好的规则INSTPAT进行一一匹配，如果匹配成功，那么就会接着进入INSTPAT_MATCH展开的程序片段，调用decode_operand,按照不同的指令类型执行不同的读取操作。
**Execute**
在INSTRAP_MATCH中，会同时展开对应的表达式，比如`R(rd) = s->pc + imm)` 用c语言实现指令执行的功能。
> R(rd)也是一个宏，需要进一步展开

最后是一个goto语句直接跳转到“ INSTPAT_END()”，完成一个指令的执行。

注意到其中有关pc的数据流向：
先把cpu.pc赋值给s->pc和s->snpc，然后按照这个 pc进行取指令，并且取指令的过程中把s->snpc进行自增操作，调用decode_exec的时候，又把snpc赋值给dnpc，然后在decode_operand阶段和exec阶段暂时没有对pc的修改（因为目前还没有实现J和B型指令）
最后是把**s->dnpc赋值给了cpu.pc**
> 我有一个疑惑，那为什么需要s->snpc？直接s->pc不就够用了吗？ 我的猜测是其他的ISA实现可能需要用到


##### 为什么执行了未实现指令会出现上述报错信息

RTFSC, 理解执行未实现指令的时候, NEMU具体会怎么做.

> [!NOTE] 回答
> 因为所有未执行的指令最终都会在模式识别的时候被认为是`  INSTPAT("??????? ????? ????? ??? ????? ????? ??", inv    , N, INV(s->pc));` 然后执行invalid_inst函数，在这里会显示出下面的这些报错：
> ![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251010220220.png)





#####  通过批处理模式运行NEMU

我们知道, 大部分同学很可能会这么想: 反正我不阅读Makefile, 老师助教也不知道, 总觉得不看也无所谓.

所以在这里我们加一道必做题: 我们之前启动NEMU的时候, 每次都需要手动键入`c`才能运行客户程序. 但如果不是为了使用NEMU中的sdb, 我们其实可以节省`c`的键入. NEMU中实现了一个批处理模式, 可以在启动NEMU之后直接运行客户程序. 请你阅读NEMU的代码并合适地修改Makefile, 使得通过AM的Makefile可以默认启动批处理模式的NEMU.

解答：在nemu-main.c中调用了engine_start函数，其中
```cpp
void engine_start() {
#ifdef CONFIG_TARGET_AM
  cpu_exec(-1);
#else
  /* Receive commands from user. */
  sdb_mainloop();
#endif
}

void sdb_mainloop() {
  if (is_batch_mode) {
    cmd_c(NULL);
    return;
  }
  ...
}
```
其中在sdb_mainloop里面如何设置了batch_mode那就会直接执行客户程序，因此，只需要在代码中设置batch_mode即可。
使用grep搜索发现，在monitor.c文件中，在prase_args函数里面存在这样一句：
```cpp
 case 'b': sdb_set_batch_mode(); break;
```
只需要在运行的时候加上一个-b参数即可。
先尝试自己手动输入-b参数试试：
```cpp
~/ics2024/nemu pa2 ?1 ❯ /home/yama/ics2024/nemu/build/riscv32-nemu-interpreter -b                                        11:49:09
[src/utils/log.c:30 init_log] Log is written to stdout
[src/utils/log.c:30 init_log] Log is written to stdout
[src/memory/paddr.c:52 init_mem] physical memory area [0x80000000, 0x87ffffff]
[src/memory/paddr.c:52 init_mem] physical memory area [0x80000000, 0x87ffffff]
[src/monitor/monitor.c:51 load_img] No image is given. Use the default build-in image.
[src/monitor/monitor.c:51 load_img] No image is given. Use the default build-in image.
[src/monitor/sdb/expr.c:76 init_regex] Regex init successfully!

[src/monitor/sdb/expr.c:76 init_regex] Regex init successfully!

[src/monitor/monitor.c:28 welcome] Trace: ON
[src/monitor/monitor.c:28 welcome] Trace: ON
[src/monitor/monitor.c:29 welcome] If trace is enabled, a log file will be generated to record the trace. This may lead to a large log file. If it is not necessary, you can disable it in menuconfig
[src/monitor/monitor.c:29 welcome] If trace is enabled, a log file will be generated to record the trace. This may lead to a large log file. If it is not necessary, you can disable it in menuconfig
[src/monitor/monitor.c:32 welcome] Build time: 11:05:19, Oct 10 2025
[src/monitor/monitor.c:32 welcome] Build time: 11:05:19, Oct 10 2025
Welcome to riscv32-NEMU!
For help, type "help"
Exectute Once, current pc is 2147483648
0x80000000: 00 00 02 97 auipc   t0, 0
testExectute Once, current pc is 2147483652
0x80000004: 00 02 88 23 sb      zero, 0x10(t0)
testExectute Once, current pc is 2147483656
0x80000008: 01 02 c5 03 lbu     a0, 0x10(t0)
testExectute Once, current pc is 2147483660
0x8000000c: 00 10 00 73 ebreak
test[src/cpu/cpu-exec.c:125 cpu_exec] nemu: HIT GOOD TRAP at pc = 0x8000000c
[src/cpu/cpu-exec.c:125 cpu_exec] nemu: HIT GOOD TRAP at pc = 0x8000000c
[src/cpu/cpu-exec.c:95 statistic] host time spent = 1893 us
[src/cpu/cpu-exec.c:95 statistic] host time spent = 1893 us
[src/cpu/cpu-exec.c:96 statistic] total guest instructions = 4
[src/cpu/cpu-exec.c:96 statistic] total guest instructions = 4
[src/cpu/cpu-exec.c:97 statistic] simulation frequency = 2113 inst/s
[src/cpu/cpu-exec.c:97 statistic] simulation frequency = 2113 inst/s
~/ics2024/nemu pa2 ?1 ❯                                                
```

通过RTFS可以知道，每一次在am-kernels/tests/cpu-tests/运行 make run指令的时候，会把指定的测试文件逐个生成一个文件，按照如下的指令生成文件：
```
Makefile.%: tests/%.c latest
    @/bin/echo -e "NAME = $*\nSRCS = $<\ninclude $${AM_HOME}/Makefile" > $@
```
其中把AM_HOME下的Makefile给include进来了，因此主要的构建逻辑在这。
而在这个文件里面，又include了riscv.mk和nemu.mk，我的目标是把nemu作为platform的时候，默认直接执行，除非加上--sdb参数，才启动sdb。
看到nemu.mk里面有NEMUFLAGS，因此只需要检测我的输入是否有“SDB=1”，如果有的话，那就加上sdb调试（不带-b参数），没有的话则加上调试：
```makefile
ifeq ($(SDB),1)
  # SDB mode: do NOT add -b
else
  NEMUFLAGS += -b
endif
```
重新运行发现，的确可以做到立刻运行代码：
![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251011085023.png)
