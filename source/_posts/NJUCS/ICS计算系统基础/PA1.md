---
author: 雷业成241220106
categories:
  - NJUCS
  - ICS计算系统基础
---

## 遇见的问题

**ssh连接失败**

貌似是梯子的问题，clash开了tun模式，之后关闭梯子即可正常使用。





## 必做题

### **状态机**

```
// PC: instruction    | // label: statement
0: mov  r1, 0         |  pc0: r1 = 0;
1: mov  r2, 0         |  pc1: r2 = 0;
2: addi r2, r2, 1     |  pc2: r2 = r2 + 1;
3: add  r1, r1, r2    |  pc3: r1 = r1 + r2;
4: blt  r2, 100, 2    |  pc4: if (r2 < 100) goto pc2;   // branch if less than
5: jmp 5              |  pc5: goto pc5;
```

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250901210018927.png" alt="image-20250901210018927" style="zoom:50%;" />

```text
回答：(0,x,x)->(1,0,x)->(2,0,0)->(3,0,1)->(4,1,1)->(2,1,1)->(3,1,2)->(4,3,2)->......->(2,4851,98)->(3,4851,99)->(4,4950,99)->(2,4950,99)->(3,4950,100)->(4,5050,100)->(5,5050,100)->...# 不断循环这个
```

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


### 实现算术表达式的词法分析

你需要完成以下的内容:

- 为算术表达式中的各种token类型添加规则, 你需要注意C语言字符串中转义字符的存在和正则表达式中元字符的功能.
- 在成功识别出token后, 将token的信息依次记录到`tokens`数组中.
> [!NOTE] regex库快速了解

## 补充：C语言拾遗

**Spiral Rule** 螺旋法则

[Clockwise/Spiral Rule](https://c-faq.com/decl/spiral.anderson.html)
```c
                      +-----------------------------+
                      |                  +---+      |
                      |  +---+           |+-+|      |
                      |  ^   |           |^ ||      |
                void (*signal(int, void (*fp)(int)))(int);
                 ^    ^      |      ^    ^  ||      |
                 |    +------+      |    +--+|      |
                 |                  +--------+      |
                 +----------------------------------+
```
signal是一个函数：
- 参数为：
	1. int
	2. 一个函数指针fp，fp指向的函数接受一个int作为参数，return为空
- 返回值为：一个函数指针，接受参数为int，返回为空
**建议**：使用 `typedef`，比如`typedef void (*sighandle_t)(int)`之后，再定义为`sighandle_t signal(int, void (*fp)(int));`

