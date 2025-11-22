---
title: NEMU PA2
date: 2025-10-10 08:39:27
categories:
  - NJUCS
  - ICS计算系统基础
article: false
cover: https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/Generated Image November 02, 2025 - 7_27PM.png
created: 2025-10-10T08:39
updated: 2025-11-08T13:56
author: 雷业成241220106
---
<div style="font-family: Georgia, serif; text-align: center; max-width: 600px; margin: 0 auto; padding: 40px 20px; line-height: 1.6; color: #111;">
  <h1 style="font-size: 2.8rem; font-weight: 700; margin: 10px 0;">ICS实验报告</h1>
  <p style="font-size: 1.2rem; color: #333; margin: 15px 0;">PA2：“简单复杂的机器: 冯诺依曼计算机系统”</p>
  <p style="font-size: 1.4rem; margin: 0;">学生: &nbsp;&nbsp;雷业成 (241220106) </p>
  <p style="font-size: 0.9rem; margin: 5px 0 15px;"> 南京大学计算机科学与技术系</p>
<p style="font-size: 0.9rem; margin: 5px 0 15px;">邮箱: 241220106@smail.nju.edu.cn</p>
  <p style="font-size: 1.3rem;  font-weight: bold; margin: 0;">2025 11 8</p>
</div>


**内容大纲**

- [实验过程记录](#%E5%AE%9E%E9%AA%8C%E8%BF%87%E7%A8%8B%E8%AE%B0%E5%BD%95)
	- [RTFSC](#RTFSC)
			- [指令实现](#%E6%8C%87%E4%BB%A4%E5%AE%9E%E7%8E%B0)
			- [为什么执行了未实现指令会出现上述报错信息](#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%89%A7%E8%A1%8C%E4%BA%86%E6%9C%AA%E5%AE%9E%E7%8E%B0%E6%8C%87%E4%BB%A4%E4%BC%9A%E5%87%BA%E7%8E%B0%E4%B8%8A%E8%BF%B0%E6%8A%A5%E9%94%99%E4%BF%A1%E6%81%AF)
			- [通过批处理模式运行NEMU](#%E9%80%9A%E8%BF%87%E6%89%B9%E5%A4%84%E7%90%86%E6%A8%A1%E5%BC%8F%E8%BF%90%E8%A1%8CNEMU)
	- [程序, 运行时环境与AM](#%E7%A8%8B%E5%BA%8F,%20%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83%E4%B8%8EAM)
			- [实现字符串处理函数](#%E5%AE%9E%E7%8E%B0%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0)
			- [实现sprintf](#%E5%AE%9E%E7%8E%B0sprintf)
			- [stdarg是如何实现的?](#stdarg%E6%98%AF%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84?)
	- [基础设施(2)](#%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD(2))
			- [实现iringbuf](#%E5%AE%9E%E7%8E%B0iringbuf)
			- [实现mtrace](#%E5%AE%9E%E7%8E%B0mtrace)
			- [消失的符号](#%E6%B6%88%E5%A4%B1%E7%9A%84%E7%AC%A6%E5%8F%B7)
			- [寻找"Hello World!"](#%E5%AF%BB%E6%89%BE%22Hello%20World!%22)
			- [实现ftrace](#%E5%AE%9E%E7%8E%B0ftrace)
			- [不匹配的函数调用和返回](#%E4%B8%8D%E5%8C%B9%E9%85%8D%E7%9A%84%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E5%92%8C%E8%BF%94%E5%9B%9E)
			- [冗余的符号表](#%E5%86%97%E4%BD%99%E7%9A%84%E7%AC%A6%E5%8F%B7%E8%A1%A8)
			- [如何生成native的可执行文件](#%E5%A6%82%E4%BD%95%E7%94%9F%E6%88%90native%E7%9A%84%E5%8F%AF%E6%89%A7%E8%A1%8C%E6%96%87%E4%BB%B6)
			- [奇怪的错误码](#%E5%A5%87%E6%80%AA%E7%9A%84%E9%94%99%E8%AF%AF%E7%A0%81)
		- [difftest](#difftest)
	- [输入输出](#%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA)
			- [理解volatile关键字](#%E7%90%86%E8%A7%A3volatile%E5%85%B3%E9%94%AE%E5%AD%97)
			- [运行Hello World](#%E8%BF%90%E8%A1%8CHello%20World)
			- [理解mainargs](#%E7%90%86%E8%A7%A3mainargs)
			- [实现printf](#%E5%AE%9E%E7%8E%B0printf)
			- [benchmark](#benchmark)
			- [实现键盘](#%E5%AE%9E%E7%8E%B0%E9%94%AE%E7%9B%98)
			- [如何检测多个键同时被按下?](#%E5%A6%82%E4%BD%95%E6%A3%80%E6%B5%8B%E5%A4%9A%E4%B8%AA%E9%94%AE%E5%90%8C%E6%97%B6%E8%A2%AB%E6%8C%89%E4%B8%8B?)
			- [实现VGA](#%E5%AE%9E%E7%8E%B0VGA)
- [必答题](#%E5%BF%85%E7%AD%94%E9%A2%98)
	- [程序是个状态机](#%E7%A8%8B%E5%BA%8F%E6%98%AF%E4%B8%AA%E7%8A%B6%E6%80%81%E6%9C%BA)
	- [RTFSC](#RTFSC)
	- [程序如何运行](#%E7%A8%8B%E5%BA%8F%E5%A6%82%E4%BD%95%E8%BF%90%E8%A1%8C)
	- [编译与链接](#%E7%BC%96%E8%AF%91%E4%B8%8E%E9%93%BE%E6%8E%A5)
	- [编译与链接](#%E7%BC%96%E8%AF%91%E4%B8%8E%E9%93%BE%E6%8E%A5)
	- [了解Makefile](#%E4%BA%86%E8%A7%A3Makefile)



## 实验过程记录
### RTFSC
##### 指令实现

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
接着测试所有的代码：
<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251012083441.png" alt="描述文字" width="20%">
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
> Bug 真多，记不下来。。。。
---

**补充：在后面才发现。。原来有一个叫做riscv-test-am的东西可以直接检查指令实现的正确与否**

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

>~~幸亏我PA写得慢，和理论课居然同步了？~~

![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251029215935.png)
如图，在.rodata段，因为字符串是只读的，因此存储在.rodata段。
#####  实现ftrace

根据上述内容, 在NEMU中实现ftrace. 你可以自行决定输出的格式. 你需要注意以下内容:

- 你需要为NEMU传入一个ELF文件, 你可以通过在`parse_args()`中添加相关代码来实现这一功能
- 你可能需要在初始化ftrace时从ELF文件中读出符号表和字符串表, 供你后续使用
- 关于如何解析ELF文件, 可以参考`man 5 elf`
- 如果你选择的是riscv32, 你还需要考虑如何从`jal`和`jalr`指令中正确识别出函数调用指令和函数返回指令

注意, 你不应该通过`readelf`等工具直接解析ELF文件. 在真实的项目中, 这个方案确实可以解决问题; 但作为一道学习性质的题目, 其目标是让你了解ELF文件的组织结构, 使得将来你在必要的时候(例如在裸机环境中)可以自己从中解析出所需的信息. 如果你通过`readelf`等工具直接解析ELF文件, 相当于自动放弃训练的机会, 与我们设置这道题目的目的背道而驰.
**遇见了如下问题**
1. 在实现解析elf解析的时候不小心把.shstrtab和.strtab弄混了，，，导致一直找不到错误的地方。
2. 在解析section_header的时候，发现解析symtab的时候，找到对应type为FUNC的item，死活打印不出对应的name；strtab的解析又是正确的，十分奇怪，后来发现是 **在遍历SHT的时候，strtab的顺序在symtab的后面。。。**  
3. 在判断什么时候是函数return的时候，参考了博客[ICS-PA学习记录: PA2 - 中 | YorigamiChitose](https://yorigamichitose.github.io/posts/tech/23-01-15-pa2-2/#%e8%ae%b0%e5%bd%95%e5%87%bd%e6%95%b0%e8%b0%83%e7%94%a8)，发现自己把寄存器编号和寄存器值弄混了。
新建了一个文件（prase_elf.c），实现解析elf文件之后，再实现打印trace的功能，最后在在`jal`与`jalr`这两个指令中添加调用ftrace的功能
![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251105164706.png)
最后的实现效果如上图所示。



#####  不匹配的函数调用和返回

如果你仔细观察上文`recursion`的示例输出, 你会发现一些有趣的现象. 具体地, 注释(1)处的`ret`的函数是和对应的`call`匹配的, 也就是说, `call`调用了`f2`, 而与之对应的`ret`也是从`f2`返回; 但注释(2)所指示的一组`call`和`ret`的情况却有所不同, `call`调用了`f1`, 但却从`f0`返回; 注释(3)所指示的一组`call`和`ret`也出现了类似的现象, `call`调用了`f1`, 但却从`f3`返回.

尝试结合反汇编结果, 分析为什么会出现这一现象.

在看了一些博客+问了ai之后，稍微总结一下原因：
- 这个是编译器优化的结果，出现了tail call（尾调用 ）
- 在f0函数中调用f1函数出现了：
```c
80000050:       00078067                jr      a5
```
这里的`jr`跳转没有ra，是一个尾调用，把当前函数的返回权“移交”给被跳转的函数。

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


1. 尝试用strip去掉可执行目标文件的符号表之后，还是可以正常运行
2. 但是在strip去标重定位目标文件的符号表之后在链接的时候就出现了问题：
```c
tmp/code ❯ strip -s hello.o                                                                     17:12:16
/tmp/code ❯ gcc -o hello hello.o                                                                 17:12:25
/usr/bin/ld: error in hello.o(.eh_frame); no .eh_frame_hdr table will be created
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/13/../../../x86_64-linux-gnu/Scrt1.o: in function `_start':
(.text+0x1b): undefined reference to `main'
collect2: error: ld returned 1 exit status
/tmp/code ❯      
```
说明在链接生成可执行目标文件的过程中，必须要有符号表的（链接的核心就是重定位和合并section），没有符号表就没法进行符号解析。
但是在可执行文件中，函数地址已经被替换为真实的地址了
`    1151:       48 8d 05 ac 0e 00 00    lea    0xeac(%rip),%rax        # 2004 <_IO_stdin_used+0x4>`，符号表在执行的过程中实际上是可有可无得。

#####  如何生成native的可执行文件

阅读相关Makefile, 尝试理解`abstract-machine`是如何生成`native`的可执行文件的.
在$AM_HOME下的makefile中可以看出，当ARCH=native的时候，链接使用宿主机 C++ 链接器（g++），直接生成 IMAGE.elf
```c
ifneq ($(filter $(ARCH),native),)
    @$(CXX) -o $@ -Wl,--whole-archive $(LINKAGE) -Wl,-no-whole-archive $(LDFLAGS_CXX)
else
    @$(LD) $(LDFLAGS) -o $@ --start-group $(LINKAGE) --end-group
endif
```
在`abstract-machine/scripts/native.mk`这个文件里，直接运行elf文件：
```c
run: image
    $(IMAGE).elf
```


#####  奇怪的错误码
为什么错误码是`1`呢? 你知道`make`程序是如何得到这个错误码的吗?
错误吗为1代表了一般性的错误，说明程序在构建的时候出现了错误.程序在执行的时候都会有一个退出码，make可以得到这个退出码。如果退出码不是0，说明是异常退出。



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
在实现这个函数的时候犯了一个错误，在比较pc的时候，**应该是比较ref_r->pc和cpu.pc**，而不是将cpu.pc和pc进行比较。
实现好isa_difftest_checkregs()函数之后，在dut.c中调用这个函数来检查寄存器的错误。


### 输入输出

#####  理解volatile关键字

也许你从来都没听说过C语言中有`volatile`这个关键字, 但它从C语言诞生开始就一直存在. `volatile`关键字的作用十分特别, 它的作用是避免编译器对相应代码进行优化. 你应该动手体会一下`volatile`的作用, 在GNU/Linux下编写以下代码:

```
void fun() {
  extern unsigned char _end;  // _end是什么?
  volatile unsigned char *p = &_end;
  *p = 0;
  while(*p != 0xff);
  *p = 0x33;
  *p = 0x34;
  *p = 0x86;
}
```

然后使用`-O2`编译代码. 尝试去掉代码中的`volatile`关键字, 重新使用`-O2`编译, 并对比去掉`volatile`前后反汇编结果的不同.

你或许会感到疑惑, 代码优化不是一件好事情吗? 为什么会有`volatile`这种奇葩的存在? 思考一下, 如果代码中`p`指向的地址最终被映射到一个设备寄存器, 去掉`volatile`可能会带来什么问题?

```c
/tmp/code ❯ gcc -O2 -o tmp.out tmp.c && objdump -d tmp.out  | wc -l 
131
/tmp/code ❯ vim tmp.c                                                                  17:46:55
/tmp/code ❯ gcc -O2 -o tmp.out tmp.c && objdump -d tmp.out  | wc -l                 9s 17:47:23
123
```
发现删去violate之后，汇编代码变短了。查看代码逻辑，发现去掉volatile之后，出现![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251105174919.png)
上图为去掉volatile，下图为保留volatile的情况
![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251105174931.png)

如果指向设备寄存器的指针p的一些看似无意义的操作被优化了，可能导致最终一些给IO设备的指令被优化了，比如对p指针的赋值可能就是一些指令。

#####  运行Hello World

如果你选择了x86, 你需要实现`in`, `out`指令. 具体地, 你需要RTFSC, 然后在`in`指令和`out`指令的实现中正确调用`pio_read()`和`pio_write()`. 如果你选择的是mips32和riscv32, 你不需要实现额外的代码, 因为NEMU的框架代码已经支持MMIO了.

实现后, 在`am-kernels/kernels/hello/`目录下键入

```
make ARCH=$ISA-nemu run
```

如果你的实现正确, 你将会看到程序往终端输出一些信息(请注意不要让输出淹没在调试信息中).

> 需要把所有的trace先关闭，然后才比较查看：![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251106220735.png)


#####  理解mainargs

请你通过RTFSC理解这个参数是如何从`make`命令中传递到`hello`程序中的, `$ISA-nemu`和`native`采用了不同的传递方法, 都值得你去了解一下.

在native中，通过环境变量的方式进行传递参数`const char *args = getenv("mainargs");` 
在nemu中，有一步调用了python脚本来执行insert操作
```c
MAINARGS_MAX_LEN = 64

MAINARGS_PLACEHOLDER = the_insert-arg_rule_in_Makefile_will_insert_mainargs_here

CFLAGS += -DMAINARGS_MAX_LEN=$(MAINARGS_MAX_LEN) -DMAINARGS_PLACEHOLDER=$(MAINARGS_PLACEHOLDER)

insert-arg: image
  @python $(AM_HOME)/tools/insert-arg.py $(IMAGE).bin $(MAINARGS_MAX_LEN) $(MAINARGS_PLACEHOLDER) "$(mainargs)"
```
通过这里的insert来把mainargs进行传递，之后在trm中通过`TOSTRING`宏进行加载。



#####  实现printf

有了`putch()`, 我们就可以在klib中实现`printf()`了.

你之前已经实现了`sprintf()`了, 它和`printf()`的功能非常相似, 这意味着它们之间会有不少重复的代码. 你已经见识到Copy-Paste编程习惯的坏处了, 思考一下, 如何简洁地实现它们呢?

实现了`printf()`之后, 你就可以在AM程序中使用输出调试法了.

我的实现方法是：
- 开辟一个buffer，然后调用`vsnprintf`函数，来给buffer进行填充，之后再调用putch函数依次读取这个buffer就行
#####  benchmark
在benchmark阶段，在关闭了所有的配置(trace,difftest等等）之后，仍然跑分很低，最后发现是修改了配置，但是没有先clean nemu再重新编译nemu。最后跑microbench/ref得分为356，跑corebench得分为

#####  实现键盘
这一步我犯了一个大错：我以为inl函数只是读取内存这么简单，但是实际上还涉及到：
- 读取的时候会调用i8042_data_io_handle回调函数，把队列中新的一个键写入`i8042_data_port_base`里面，这样下一次再读取，那么就会再次调用回调函数，把新的值写入。
- 读取的时候为什么会调用回调函数？因为inl虽然只是简单的读取，但是am最后还是要在nemu上面跑，在nemu上面跑就会调用paddr_read函数，而paddr_read函数会在判断内存不在pmem的时候交由mmio_read处理，`IFDEF(CONFIG_DEVICE, return mmio_read(addr, len));`，mmio_read又会再次用到map，之后调用map_read，map_read再触发回调函数。
```c
void __am_input_keybrd(AM_INPUT_KEYBRD_T *kbd) {
  kbd->keydown = inl(KBD_ADDR) & KEYDOWN_MASK ? true : false;
  kbd->keycode = kbd->keydown ? inl(KBD_ADDR) & ~KEYDOWN_MASK : AM_KEY_NONE;
  printf("keydown: %d, keycode: %d\n", kbd->keydown, kbd->keycode);
```
而我的代码，在调用了一次inl之后就会触发回调把新的值给写入这里，导致出现keycode只能读到空键（除非我能够在两次读取间敲入两个相同的键）

#####  如何检测多个键同时被按下?

在游戏中, 很多时候需要判断玩家是否同时按下了多个键, 例如RPG游戏中的八方向行走, 格斗游戏中的组合招式等等. 根据键盘码的特性, 你知道这些功能是如何实现的吗?

键盘读取的逻辑是这样的：
- 用户在sdl中输入键盘->事件被存入sdl等待队列，在update_device的时候，把键盘事件存入nemu维护的键盘队列->当am从内存中读取键盘的时候，nemu触发回调函数->把新的键盘事件存入内存中
因此，想要检测是否多个键被同时摁下，应该是由客户端的程序负责记录保存，而不是靠nemu或者是am（因为它们只负责读取键）

##### 实现VGA
在am中： 客户程序调用vga的接口，进行绘画（提供像素pixels和渲染标志sync），然后把am负责把这些信息写入内存中，nemu在update_device的时候发现标志寄存器被改变，于是将新的绘画内容展示在sdl上。
- 像素存储在vmem中
- 宽度、高度、sync存储在vgactl中
按照数据流向对框架代码进行维护即可。
## 必答题
下面是PA实验报告的必答题。

你需要在实验报告中用自己的语言, 尽可能详细地回答下列问题.

###  程序是个状态机 
理解YEMU的执行过程, 具体请参考[这里](https://nju-projectn.github.io/ics-pa-gitbook/ics2025/2.1.html#%E7%90%86%E8%A7%A3yemu%E5%A6%82%E4%BD%95%E6%89%A7%E8%A1%8C%E7%A8%8B%E5%BA%8F).
**YEMU上执行加法程序的状态机为：**
![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251107235338.png)

**YEMU执行一条指令的方法为：**
- 根据当前pc取出指令，并且按照当前的opcode来对应到不同的指令执行
- 然后按照r型和m型的区别分别进行指令译码，指令译码利用了宏展开，分别从指令中取出对应的寄存器或者地址
- 然后按照指令对应的规范进行计算。

**二者的联系为**
- 取指令执行的过程就是状态机改变的过程
---
### RTFSC 
请整理一条指令在NEMU中的执行过程, 具体请参考[这里](https://nju-projectn.github.io/ics-pa-gitbook/ics2025/2.2.html#rtfsc%E7%90%86%E8%A7%A3%E6%8C%87%E4%BB%A4%E6%89%A7%E8%A1%8C%E7%9A%84%E8%BF%87%E7%A8%8B).

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
先把cpu.pc赋值给s->pc和s->snpc，然后按照这个 pc进行取指令，并且取指令的过程中把s->snpc进行自增操作，调用decode_exec的时候，又把snpc赋值给dnpc，然后在decode_operand阶段和exec阶段对pc的修改**改动的都是s->dnpc**，最后是把**s->dnpc赋值给了cpu.pc**.

### 程序如何运行
理解打字小游戏如何运行, 具体请参考[这里](https://nju-projectn.github.io/ics-pa-gitbook/ics2025/2.5.html#%E6%B8%B8%E6%88%8F%E6%98%AF%E5%A6%82%E4%BD%95%E8%BF%90%E8%A1%8C%E7%9A%84).
请你以打字小游戏为例, 结合"程序在计算机上运行"的两个视角, 来剖析打字小游戏究竟是如何在计算机上运行的. 具体地, 当你按下一个字母并命中的时候, 整个计算机系统(NEMU, ISA, AM, 运行时环境, 程序) 是如何协同工作, 从而让打字小游戏实现出"命中"的游戏效果?

- 对于用户程序，调用了io_read来获取时间、键盘信息，并且通过io_write来把像素信息写入。
- 对于AM，程序调用的io_read会在am中调用对应寄存器读取的函数，am通过这些函数把客户程序需要的数据给客户。而AM通过读取对应内存地址的值来得到这些数据（如读取时间）
- 对于NEMU，程序最终需要的信息是由nemu来提供，时间通过nemu调用库函数实现、键盘和渲染通过sdl库实现，nemu和am之间通过约定好的方式进行交互。最终把信息给到用户程序。

当我按下一个字母的时候，sdl会检测到这个事件，将其加入在nemu中的sdl时间pending队列，然后在nemu的update触发之后，把当前的所有事件都处理掉，也即会把目前的键盘事件给处理，存入nemu自行维护的queue中。此后，用户程序每一次io_read键盘的时候，借助am来读取键盘信息的时候，都会从键盘mmap的地址中取出需要的值，然后触发回调函数，从nemu维护的queue中取出一个新的键盘事件存入键盘寄存器中。
在客户程序里面，通过io_read键盘，读到了用户输入了某一个键，之后送入到check_hit函数中依次寻找是否和某一个键相匹配，如果是，那么把这个键的速度调整为向上，完成命中的效果。
### 编译与链接 
- 在`nemu/include/cpu/ifetch.h`中, 你会看到由`static inline`开头定义的`inst_fetch()`函数. 分别尝试去掉`static`, 去掉`inline`或去掉两者, 然后重新进行编译, 你可能会看到发生错误. 请分别解释为什么这些错误会发生/不发生? 你有办法证明你的想法吗?
尝试进行上面的操作，发现：
- 单独去了static或者 inline没事
- 同时去掉两者就有事
出现错误：
```
/usr/bin/ld: /home/yama/ics2024/nemu/build/obj-riscv32-nemu-interpreter/src/engine/interpreter/hostcall.o: in function `inst_fetch':
/home/yama/ics2024/nemu/src/engine/interpreter/hostcall.c:20: multiple definition of `inst_fetch'; /home/yama/ics2024/nemu/build/obj-riscv32-nemu-interpreter/src/isa/riscv32/inst.o:/home/yama/ics2024/nemu/include/cpu/ifetch.h:20: first defined here
collect2: error: ld returned 1 exit status
make[2]: *** [/home/yama/ics2024/nemu/scripts/build.mk:54: /home/yama/ics2024/nemu/build/riscv32-nemu-interpreter] Error 1
make[1]: *** [/home/yama/ics2024/abstract-machine/scripts/platform/nemu.mk:37: run] Error 2
test list [1 item(s)]: dummy
[         dummy] ***FAIL***
```
错误为multi definition，我的猜测是，之前使用static inline或者static的时候这个函数都是文件作用域，因此不会和外部的这个函数重复。
而如果有一个inline的话，在编译的时候会进行展开，也不会存在符号冲突的情况。
但是如果同时没有static也没有inline，那么：因为hostcall.c和inst.c都include了这个头文件，因而这个函数被定义了两次，在链接的时候就会报错。

### 编译与链接
 1. 在`nemu/include/common.h`中添加一行`volatile static int dummy;` 然后重新编译NEMU. 请问重新编译后的NEMU含有多少个`dummy`变量的实体? 你是如何得到这个结果的?

**回答**：所有直接或者间接include了common.h的文件都会有这样的一个实体，可以使用如下代码来进行计数：
```sh
~/ics2024/n/b/o/src pa2 ?1 ❯ find . -name "*.o" | xargs nm | grep dummy | wc -l 
36
~/ics2024/n/b/o/src pa2 ?1 ❯      
```

 2. 添加上题中的代码后, 再在`nemu/include/debug.h`中添加一行`volatile static int dummy;` 然后重新编译NEMU. 请问此时的NEMU含有多少个`dummy`变量的实体? 与上题中`dummy`变量实体数目进行比较, 并解释本题的结果.
再次运行，还是36个
```sh
~/ics2024/n/b/o/src pa2 ?1 ❯ find . -name "*.o" | xargs nm | grep dummy | wc -l 
36
~/ics2024/n/b/o/src pa2 ?1 ❯   
```
因为在common.h中就已经include了debug.h，所以会出现两个一样的语句，而这两个语句都声明了一个common符号，两个相同的common符号不会出现报错，会以其中一个为准。

3. 修改添加的代码, 为两处`dummy`变量进行初始化:`volatile static int dummy = 0;` 然后重新编译NEMU. 你发现了什么问题? 为什么之前没有出现这样的问题? (回答完本题后可以删除添加的代码.)
添加之后，在make阶段就出现了问题，因为重复声明了两个STRONG的符号，在编译的时候就无法通过。
### 了解Makefile
请描述你在`am-kernels/kernels/hello/`目录下敲入`make ARCH=$ISA-nemu` 后, `make`程序如何组织.c和.h文件, 最终生成可执行文件`am-kernels/kernels/hello/build/hello-$ISA-nemu.elf`. (这个问题包括两个方面:`Makefile`的工作方式和编译链接的过程.) 
关于`Makefile`工作方式的提示:
    - `Makefile`中使用了变量, 包含文件等特性
    - `Makefile`运用并重写了一些implicit rules
    - 在`man make`中搜索`-n`选项, 也许会对你有帮助
    - RTFM

在最核心的Makefile脚本（$AM_HOME/Makefile）中会设置目标输出目录和IMAGE输出，并且按照ARCH来include对应架构的mk脚本（内含特定的编译选项）
在Makefile里面对SRCS变量的每一个源文件都进行编译，编译的规则为`$(CC) $(CFLAGS) -c hello.c -o $(DST_DIR)/hello.o` 其中CC是编译器，CFLAGS是编译选项。

此外把am和kilb等库打包为Archive文件，之后在链接阶段，链接得到elf文件
```mk
$(IMAGE).elf: $(LINKAGE) $(LDSCRIPTS)

    @echo \# Creating image [$(ARCH)]

    @echo + LD "->" $(IMAGE_REL).elf

ifneq ($(filter $(ARCH),native),)

    @$(CXX) -o $@ -Wl,--whole-archive $(LINKAGE) -Wl,-no-whole-archive $(LDFLAGS_CXX)

else

    @$(LD) $(LDFLAGS) -o $@ --start-group $(LINKAGE) --end-group

endif
```

最后是使用python脚本把mainargs插入二进制二进制文件之后，把文件送入nemu中运行。
自此，完成从变异到运行的全流程。