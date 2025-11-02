---
author: 雷业成241220106
categories:
  - NJUCS
  - ICS计算系统基础
title: NEMU PA1
created: 2025-09-28T21:20
updated: 2025-10-10T08:40
---

[TOC]
<!--more-->


## 实验过程中的思考记录


### **宏Macro**

>   kconfig生成的宏与条件编译
>
>   我们已经在上文提到过, kconfig会根据配置选项的结果在 `nemu/include/generated/autoconf.h`中定义一些形如`CONFIG_xxx`的宏, 我们可以在C代码中通过条件编译的功能对这些宏进行测试, 来判断是否编译某些代码. 例如, 当`CONFIG_DEVICE`这个宏没有定义时, 设备相关的代码就无需进行编译.
>
>   为了编写更紧凑的代码, 我们在`nemu/include/macro.h`中定义了一些专门用来对宏进行测试的宏. 例如`IFDEF(CONFIG_DEVICE, init_device());`表示, 如果定义了`CONFIG_DEVICE`, 才会调用`init_device()`函数; 而`MUXDEF(CONFIG_TRACE, "ON", "OFF")`则表示, 如果定义了`CONFIG_TRACE`, 则预处理结果为`"ON"`(`"OFF"`在预处理后会消失), 否则预处理结果为`"OFF"`.
>
>   **这些宏的功能非常神奇, 你知道这些宏是如何工作的吗?**

**回答：**

在macro.h的文件中，对`IFDEF`和`MUXDEF`的定义为：

```c
// simplification for conditional compilation
#define __IGNORE(...)
#define __KEEP(...) __VA_ARGS__
// keep the code if a boolean macro is defined
#define IFDEF(macro, ...) MUXDEF(macro, __KEEP, __IGNORE)(__VA_ARGS__)
// keep the code if a boolean macro is undefined
#define IFNDEF(macro, ...) MUXNDEF(macro, __KEEP, __IGNORE)(__VA_ARGS__)
// keep the code if a boolean macro is defined to 1
#define IFONE(macro, ...) MUXONE(macro, __KEEP, __IGNORE)(__VA_ARGS__)
// keep the code if a boolean macro is defined to 0
#define IFZERO(macro, ...) MUXZERO(macro, __KEEP, __IGNORE)(__VA_ARGS__)
```

可以看到__IGNORE和      _ KEEP宏分别就是将传入的参数全部去掉或者全部保留。

而IFDEF则通过调用由boolean macro来决定是保留还是舍去。

而这里的MUXDEF的实现**更加巧妙**：

```c
#define CHOOSE2nd(a, b, ...) b
#define MUX_WITH_COMMA(contain_comma, a, b) CHOOSE2nd(contain_comma a, b)
#define MUX_MACRO_PROPERTY(p, macro, a, b) MUX_WITH_COMMA(concat(p, macro), a, b)
#define __P_DEF_0  X,
#define __P_DEF_1  X,
#define MUXDEF(macro, X, Y) MUX_MACRO_PROPERTY(__P_DEF_, macro, X, Y)
```

因为参数macro是一个boolean macro，因此结果一定是0或者1，而不论是0，还是1，经过concat之后，前面都会加上“__ P__DEF _”的前缀，最终变成`__P_DEF_0 `或者`__P_DEF_1`，但是这两个都变成了`X,`，那么被CHOOSE2nd选中的就将会是a。

如果macro压根就没有被定义，那么macro对应的就是空值，因此concat之后的结果也是没有定义的（因为`__P_DEF_`没定义），因此也就不会哟“X,”的展开，那么b就是the second。

也就实现了IFDEF和MUXDEF的效果：

-   MUXDEF： 如果传入的macro被定义了，那么就选择a，否则就选择b
-   IFDEF：如果macro被定义了，那就keep the code， otherwise ingnore the code

>   Thanks to [nju-pa摸鱼记3-NEMU中宏的源码阅读 - Miao's Blog](https://miaohao-oops.github.io/2022/02/05/nju-pa摸鱼记3-nemu中宏的源码阅读/) . By the way, the author is not  a nju student.

### **init_monitor函数**

阅读`init_monitor()`函数的代码, 你会发现里面全部都是函数调用. 按道理, 把相应的函数体在`init_monitor()`中展开也不影响代码的正确性. 相比之下, 在这里使用函数有什么好处呢?

使用函数可以使得代码更加清晰，模块分离，便于实现模块化设计。

### parse_args()的参数解析，以及参数从哪里来

```cpp
static int parse_args(int argc, char *argv[]) 
```

这里的argc是argument count，argv是argument vector；函数接受参数之后调用了getopt_long函数进行参数解析，按照传入的不同参数进行不同的解释。

那么参数是哪里来的呢？通过`grep -nr 'init_monitor'`在ics2025/nemu下进行查找，发现调用`init_monitor`的地方为`src/nemu-main.c`

在该文件的main函数接受了参数argc 和argv，并且原封不动地将这些参数传递到了init_monitor()中；而main函数接受的这些参数又来自运行可执行文件时的命令行参数。

For example, `./a.out arg1 arg2 arg3 `

这里一共有4个参数，其中argv[0]是程序名("./a.out")。 

```cpp
 16 #include <common.h>
 17
 18 void init_monitor(int, char *[]);
 19 void am_init_monitor();
 20 void engine_start();
 21 int is_exit_status_bad();
 22
 23 int main(int argc, char *argv[]) {
 24   /* Initialize the monitor. */
 25 #ifdef CONFIG_TARGET_AM
 26   am_init_monitor();
 27 #else
 28   init_monitor(argc, argv);
 29 #endif
 30
 31   /* Start engine. */
 32   engine_start();
 33
 34   return is_exit_status_bad();
 35 }
```

###  究竟要执行多久?

在`cmd_c()`函数中, 调用`cpu_exec()`的时候传入了参数`-1`, 你知道这是什么意思吗?

**解答**

调用cpu_exec(-1)的时候因为n的类型为uint64_t，因此将-1进行强制类型转换为2^64-1,之后传给execte()，在这里会run n遍execute_once()。

在execute中通过添加调试打印，可以发现，在加载内置程序的时候只执行了4步，就执行了内置的Hit Good TRAP。

>   添加  printf("Exectute Once, current pc is %u\n",s.pc);

![image-20250912222331896](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250912222331896.png)

###   优美地退出

为了测试大家是否已经理解框架代码, 我们给大家设置一个练习: 如果在运行NEMU之后直接键入`q`退出, 你会发现终端输出了一些错误信息. 请分析这个错误信息是什么原因造成的, 然后尝试在NEMU中修复它.

**解答**：

目前程序在make run之后会出现:

```bash
Welcome to riscv32-NEMU!
For help, type "help"
(nemu) q
make: *** [/home/yama/ics2024/nemu/scripts/native.mk:38: run] Error 1
```

说明程序以“1”退出了，回到`nemu-main`这个文件中，发现return的结果是：`is_exit_status_bad()`，而这个函数的的定义为：

```c
int is_exit_status_bad() {
  int good = (nemu_state.state == NEMU_END && nemu_state.halt_ret == 0) ||
    (nemu_state.state == NEMU_QUIT);
  return !good;
}
```

尝试打印中间变量发现，neum_state.state=1，对应的是enum { NEMU_RUNNING, NEMU_STOP, NEMU_END, NEMU_ABORT, NEMU_QUIT };中的NEMU_STOP，因此，错误**在于没有将nemu_state.state进行更改**或者是错误地将其赋值为了NUME_STOP

使用grep查找：

![image-20250912212040608](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250912212040608.png)

发现在state.c中有这样一段逻辑：

```c
NEMUState nemu_state = { .state = NEMU_STOP };
int is_exit_status_bad() {
  printf("%d",nemu_state.state);
  int good = (nemu_state.state == NEMU_END && nemu_state.halt_ret == 0) ||
    (nemu_state.state == NEMU_QUIT);
  return !good;
}
```

对nume_state进行了初始化，而此后通过grep指令搜索发现：

```cpp
~/ics2024/nemu pa1 !1 ?1 ❯ grep -nr 'nemu_state' | grep NEMU_STOP
grep: build/obj-riscv32-nemu-interpreter/src/isa/riscv32/inst.o: binary file matches
src/cpu/cpu-exec.c:117:    case NEMU_RUNNING: nemu_state.state = NEMU_STOP; break;
src/utils/state.c:18:NEMUState nemu_state = { .state = NEMU_STOP };
```

只有在初始化以及cpu-exec的代码中才会涉及到将nemu_state设置为NEMU_STOP的情况，~~但是我还没看懂其中逻辑~~。

最后检查发现，在输入q的时候应该将state设置为quit：

```c
static int cmd_q(char *args) {
  nemu_state.state=NEMU_QUIT;
  return -1;
}
```

成功实现**优雅地退出**

![image-20250912214558229](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250912214558229.png)

### 表达式求值
#### 实现算术表达式的词法分析

你需要完成以下的内容:

- 为算术表达式中的各种token类型添加规则, 你需要注意C语言字符串中转义字符的存在和正则表达式中元字符的功能.
- 在成功识别出token后, 将token的信息依次记录到`tokens`数组中.

我使用的不是BNF的方法，我采用的是数据结构课程上面学到的，使用栈来解决表达式求值的问题，我认为二者是完全等价的，因此我没有参考BNF的解法。
我的实现逻辑：
1. 读取token
2. 把操作符和操作数分成两个栈，读取到之后顺序入栈，对于operands直接入栈，对于operator来说先考察其操作符大小

**补充**：在最后实现负号和Dereference的时候，我尝试在make_tokens阶段把负号和解引用进行计算和求解，最后发现cornerr case太多了，最后花了很长 的时间重构代码，才解决了这些问题。

#####  为什么printf()的输出要换行?

如果不换行, 可能会发生什么? 你可以在代码中尝试一下, 并思考原因, 然后STFW对比你的想法.
**回答：** ~~如果不换行就看不清😂输出都胡在一起了怎么看？~~
STFW之后发现有两个作用：
- 格式化输出，好看
- 缓冲区刷新，确保内容输出

**框架代码中定义`wp_pool`等变量的时候使用了关键字`static`, `static`在此处的含义是什么? 为什么要在此处使用它?**

**回答**： 作用是让 其变为静态变量，生命周期贯穿程序始终，并且具有文件作用域，确保wp_poop的唯一性。

#### 测试表达式功能
在测试代码中，在生成随机表达式的时候，常常出现随机性的报错。最后发现``
缺少了这句话`buf[expr_size]='\0';`
1. 表达式有些过长：添加阶段逻辑，限制最大深度为10，避免过长的表达式
2. 溢出和除0错误：添加-Wall -Werror参数，直接忽略
最后是编写一个函数，来测试功能，在文件io和字符串的操作方面我不是很熟悉，~~吃了大亏~~
**所以说c语言好啊，得学啊。**
最后的处理方式是


#####  你会如何测试你的监视点实现?

我们没有提供监视点相关的测试, 思考一下, 你会如何测试?
**回答**：在检查监测点是否变化的时候，故意在代码里面修改watchpoints的值![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251007175139.png)
人为地制造监测点被改变的情况，检查发现的确游游泳。

---

## 必答题
### 程序是个状态机
- 程序是个状态机 画出计算`1+2+...+100`的程序的状态机, 具体请参考[这里](https://nju-projectn.github.io/ics-pa-gitbook/ics2025/1.2.html#%E4%BB%8E%E7%8A%B6%E6%80%81%E6%9C%BA%E8%A7%86%E8%A7%92%E7%90%86%E8%A7%A3%E7%A8%8B%E5%BA%8F%E8%BF%90%E8%A1%8C).

```
// PC: instruction    | // label: statement
0: mov  r1, 0         |  pc0: r1 = 0;
1: mov  r2, 0         |  pc1: r2 = 0;
2: addi r2, r2, 1     |  pc2: r2 = r2 + 1;
3: add  r1, r1, r2    |  pc3: r1 = r1 + r2;
4: blt  r2, 100, 2    |  pc4: if (r2 < 100) goto pc2;   // branch if less than
5: jmp 5              |  pc5: goto pc5;
```

> [!NOTE] **回答**
> (0,x,x)->(1,0,x)->(2,0,0)->(3,0,1)->(4,1,1)->(2,1,1)->(3,1,2)->(4,3,2)->......->(2,4851,98)->(3,4851,99)->(4,4950,99)->(2,4950,99)->(3,4950,100)->(4,5050,100)->(5,5050,100)->...# 不断循环这个

### 理解基础设施 
- 我们通过一些简单的计算来体会简易调试器的作用. 首先作以下假设:
    - 假设你需要编译500次NEMU才能完成PA.
    - 假设这500次编译当中, 有90%的次数是用于调试.
    - 假设你没有实现简易调试器, 只能通过GDB对运行在NEMU上的客户程序进行调试. 在每一次调试中, 由于GDB不能直接观测客户程序, 你需要花费30秒的时间来从GDB中获取并分析一个信息.
    - 假设你需要获取并分析20个信息才能排除一个bug.
    
    那么这个学期下来, 你将会在调试上花费多少时间?
> [!NOTE] 回答
> $500 \times 0.9 \times 30 \times 20 = 27000\,\text{s}$

由于简易调试器可以直接观测客户程序，假设通过简易调试器只需要花费10秒的时间从中获取并分析相同的信息。那么这个学期下来，简易调试器可以帮助你节省多少调试的时间？

> [!NOTE] 回答
> 使用 sdb 之后，每一个信息只需要 10 秒的时间进行获取，那么只需要花费原先 $\frac{1}{3}$ 的时间，也就是 9000 s


### RTFM
- RTFM 理解了科学查阅手册的方法之后, 请你尝试在你选择的ISA手册中查阅以下问题所在的位置, 把需要阅读的范围写到你的实验报告里面:
    - x86
        - EFLAGS寄存器中的CF位是什么意思?
        - ModR/M字节是什么?
        - mov指令的具体格式是怎么样的?
    - mips32
        - mips32有哪几种指令格式?
        - CP0寄存器是什么?
        - 若除法指令的除数为0, 结果会怎样?
    - **riscv32**
        - riscv32有哪几种指令格式?
        - LUI指令的行为是什么?
        - mstatus寄存器的结构是怎么样的?

> [!NOTE] 回答
> 我选择的是Riscv32。
> **对于问题一**，riscv32有几种指令格式，我查阅了https://github.com/riscv/riscv-isa-manual/releases/download/riscv-isa-release-382fd8b-2024-04-11/unpriv-isa-asciidoc.pdf    
> 在书中的2.3（Page 24）中提到了有6种指令格式，R I S B U J type
> ![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251007164614.png)
> **对于问题二**，lui指令以i结尾，结合名字推断，应该是load upper immediate，推断是一个U型指令，并且属于`Integer Register-Immediate Instructions`，于是在Manual中找到这一部分，并且在P27页中发现了
> ![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251007165257.png)
> 其功能是将一个32位的常量的高20位移动到rd寄存器中，然后将低12位赋值为0
> **对于问题三** 要求寻找一个寄存器的结构，先搜索得到[risc-v--mstatus寄存器 - putao0525 - SegmentFault 思否](https://segmentfault.com/a/1190000044992918) 发现mstatus和特权相关，因此在Volume二（特权架构）里面找；mstatus的全称为Machine Status Registers，因此定位到3.1.6（Page25）的内容![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251007170135.png)
> 架构如图中figure7所示。






### Shell命令
- shell命令 完成PA1的内容之后, `nemu/`目录下的所有.c和.h和文件总共有多少行代码? 你是使用什么命令得到这个结果的? 和框架代码相比, 你在PA1中编写了多少行代码? (Hint: 目前`pa0`分支中记录的正好是做PA1之前的状态, 思考一下应该如何回到"过去"?) 你可以把这条命令写入`Makefile`中, 随着实验进度的推进, 你可以很方便地统计工程的代码行数, 例如敲入`make count`就会自动运行统计代码行数的命令. 再来个难一点的, 除去空行之外, `nemu/`目录下的所有`.c`和`.h`文件总共有多少行代码?

> [!NOTE] 回答
> 统计nemu目录下所有的.c和.h文件有多少行：
> `find . -name "*.[ch]" | xargs cat | wc -l ` 先用find找出所有的点h和点c文件，然后送入cat读取内容，最后使用wc统计行数
> 得到的结果是**267636**
> 使用checkout回到PA0分支，同样运行上诉命令，得到的是**266809**，所以我写了827行？？？才做到PA1就已经对自己的屎山逻辑无能为力了![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251007171120.png)
> 把命令加入Makefile中加入
> ```> .PHONY: count
count:
  @find . -name "*.[ch]" | xargs cat | wc -l
> ```
从而实现make count命令.
如何去掉空行呢？在中间加上grep用正则来匹配至少有一个字符的行`find . -name "*.[ch]" | xargs cat |grep .| wc -l`


### RTFM 
打开`nemu/scripters/build.mk`文件, 你会在`CFLAGS`变量中看到gcc的一些编译选项. 请解释gcc中的`-Wall`和`-Werror`有什么作用? 为什么要使用`-Wall`和`-Werror`?


> [!NOTE] 回答
> 在手册里面已经提到了![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251007171931.png)
加上-Wall参数可以要求代码开启常见警告，帮助发现潜在错误。-Werror把所有警告视为错误，阻止编译通过。  用来避免低级错误



