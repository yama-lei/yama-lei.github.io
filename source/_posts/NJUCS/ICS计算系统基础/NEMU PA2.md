---
title: NEMU PA0
date: 2025-10-10 08:39:27
categories:
  - NJUCS
  - ICS计算系统基础
article: false
"":
---




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
s->dnpc=s->pc+4;
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
