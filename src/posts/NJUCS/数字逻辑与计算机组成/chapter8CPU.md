---
date: 2025-04-21
title: chapter8 | CPU的设计
author: yama-lei
---

## CPU概述

**CPU执行指令的过程**：

1.   根据pc取指令

异常时内部异常，中断时由于外部事件的出现导致CPU停止执行指令； 即`内部异常，外部中断`

---

### **计算机的五大组成部件**

-   Memory
-   I/O
-   Datapath 数据通路 **执行部件**
-   Control Unit 控制部件 **控制器**：控制器对执行部件发出信号。

---

#### **数据通路Datapath的基本结构**

数据通路是由**操作元件和存储元件**通过**总线**方式或**分散**方式连接而成的进行***数据存储、处理、传送***的路径

**操作元件**：（是组合逻辑电路）



**存储元件**：（时序逻辑电路）

setup时间：在时钟边沿到来**之前**，输入端保持不变的时间；

hold时间：在时钟边沿**之后**，输入端必须保持不变的时间；

clk-to-q锁存延迟：从时钟边沿到输出端稳定的时间；

#### 数据通路和时序控制

指令周期 : CPU执行一条指令需要的时间。

![image-20250421114837747](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250421114837747.png)

指令周期：**Cycle Time = Latch Prop + Longest Delay Path + Setup + Clock Skew**

为了满足数据通路的要求，要能够盲注下面这个约束关系：
$$
holdTime< ClkToQ+shortestDelay
$$
即，**在下一个信号到来前，能够hold不变，防止输出异常**

---

### 计算机性能

衡量CPU性能的是**用户CPU时间**，执行用户的作业所需的时间，不考虑IO等

CPU的执行时间：

T= CPU的时钟周期数*时钟周期/程序= 指令条数/程序 *CPI *时钟周期

>   一个程序的时钟周期数x时钟周期

**CPI**： Cycle Per Instruction，每一条指令需要多少个时钟周期

CPI是一个确定值--和CPU的设计,指令类型有关。

某个程序的CPU时间为：
$$
CPU \space Time= \sum_{i=1}^n {CPI_i * C_i}
$$
Ci为第i类指令，CPI_i 是这种指令的CPI。 再除以指令总数，即可得到程序的平均CPI.

---

为什么 ISA也会影响CPI？ 因为RISC-V没有提供像乘法和除法的指令，每个指令的时钟周期都比较短。

时钟频率翻倍但是

基准测试程序：专门用于测试性能测试的程序，使得计算机有个公共的比较方法。

**计算机性能由三个关键因素决定：指令数目，CPI，时钟周期**

-   指令数目由编译器和ISA决定
-   CPI由ISA和CPU决定
-   时钟周期由CPU的实现来决定

CPU时间 = 指令数目 * 

## 单周期的CPU设计

**单总线数据通路**

这一部分没有听懂，请自行看ppt。

时钟周期的宽度：以read、write为准（因为要以最长的为准）

**常见的指令！！！**

| 指令              | 功能 这里用的不是RTL！是我自己写的 | 说明             |
| ----------------- | ---------------------------------- | ---------------- |
| add rd rs1 rs2    | R[rd]=R[rs1]+R[rs2]                |                  |
| slt rd rs1 rs2    | rd = 1 if R[rs1]<R[rs2] else 0     | 使用signed比较   |
| sltu rd rs1 rs2   | rd= 1 if R[rs1]<R[rs2] else 0      | 使用unsigned比较 |
| ori rd rs1 imm12  | R[rd]= rs1 \| SEXT[imm12]          | ori：or immedia  |
| lui rd imm20      | R[rd]= SEXT[imm20]                 | U型imm           |
| lw rd rs1 imm12   | R[rd] = M[rs1+SEXT[imm12]]         |                  |
| sw rs1 rs2 imm12  | M[R[rs1]+SEXT[imm12]] =            |                  |
| beq rs1 rs2 imm12 | PC=PC+SEXT[imm12*2] if rs1= rs2    | 注意imm12要乘以2 |
| jal rd im20       |                                    |                  |





**存储数据的指定**：

寄存器编号只需5位

32bit machine的总线只有32位，理论上最大访问的内存为2的32次方，也就是4GB；

---

### **单流水线CPU的设计**

除R-型外，其他5类都带有立即数 ——立即数扩展器

核心运算类功能的实现  		——ALU
根据PC取指令和PC+4	    	——取指令部件
指令的RTL最终实现		       ——完整数据通路

#### 立即数扩展器

为什么需要一个立即数扩展器？ 因为RISCV的指令二进制表示中，imm的排列很混乱，而且不同的指令的imm位数和排列往往不同，因此需要立即数扩展器

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250425114704950.png" alt="image-20250425114704950" style="zoom:50%;" />

除了R型指令不需要寄存器，其他都有寄存器。因此需要一个5选1的选择器。ExtOP为3位，具体如何得到ExtOP呢？**需要根据编码Instr得到**

#### ALU 算数逻辑部件的设计

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250425115156719.png" alt="image-20250425115156719" style="zoom:50%;" />

实现的功能：

-   add or slt sltu srcB,判0

    即实现了加法，或运算，比较，将B直接输出，判断是否为0；

因为上述的9条指令需要这些运算，比如lw指令，需要加法（lw rd rs1 imm12: R[rd] <--- M[R[]]  

#### 取指令部件 Instruction Fetch Unit

每一次运行指令都有一步**更新PC**的步骤，需要依靠取指令部件；

![image-20250427103915530](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250427103915530.png)



#### R型指令的数据通路

R型指令：

-   add rd rs1 rs2: 
-   slt rd rs1 rs2;
-   sltu rd rs1 rs2;

R型指令无需imm，直接从寄存器组中读取、写入数据即可：

**写使能端信号不能乱取！！！防止出现错误**

 R型指令中，RegWr（**Reg**ister **Wr**ite）为1；

![image-20250427104315618](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250427104315618.png)

#### I型指令的型号通路（ori)

因为除了R型指令，其他的指令都有imm，rs只有一个，因此需要ALU的输入端需要一个多路选择器，以**ALUBSrc**为控制信号。

![image-20250427104604542](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250427104604542.png)

#### U型指令的信号通路

U型指令只有一个lui

-   lui rd imm20

![image-20250427110900124](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250427110900124.png)

#### Load&Store指令的信号通路

指令详情：

-   load rd rs1 imm12; R[rd] = M[R[rs1]+SEXT[imm12]] 。 **注意：这里的imm不需要乘以2，因为数据是按字节寻址的**
-   store rs1 rs2 imm12; M[R[rs1]+SEXT[imm12]]<--R[rs2]。 

Load和Store指令涉及到了存储器的访问，这里以理想存储器为例：

![image-20250427110804853](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250427110804853.png)

>   MemtoReg: 即 Memory To Register

注意：B和J型指令的imm通常需要左移一位，这是因为在设计的时候省略了1位，或者说默认最后一位为0（处于对齐指令的目的）；在RISCV规范中，给出了相关的内容，可以参考[RV32I控制转移指令的偏移量计算问题 - 知乎](https://zhuanlan.zhihu.com/p/377200438)

#### B型指令的数据通路

指令为：

-   beq rs1 rs2 imm12; if(R[rs1]=R[rs2]) PC<-- PC+(SEXT(imm12)<<1) else PC<-- PC+4;


![image-20250427112357474](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250427112357474.png)

其中下地址逻辑为：（只有当ALU计算结果为0，并且是Branch指令，才会将imm和PC相加，否则PC=PC+4）

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250427112744627.png" alt="image-20250427112744627" style="zoom:50%;" />



#### J型指令

J型指令：

-   jal rd imm20; R[rd]<- PC+4, PC<- PC+SEXT(imm20<<1);

J型指令除了需要跳转，还需要将下一条指令存入寄存器（实现call的操作）

![image-20250427113923927](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250427113923927.png)

---

**指令的执行结果总是在新的时钟周期到来之前，才会将其保存在寄存器、PC、存储器中**

一个时钟周期的时间为：clk-to-q+longest delay +setup+ 时钟偏移，可以看出，时钟周期应该根据最长的delay来决定。



---

>   考试的时候以 短周期和流水线的数据通路图、控制器，很清楚地知道每一个控制信号，每一条线的内容，指令必须看得到，不一定会写汇编代码。

### 控制器的设计

前面提过，CPU的核心是数据通路（执行部件）和控制器（控制部件），前面已经设计好了数据通路，但是数据通路中的很多信号，比如ALUctr需要控制器的作用。

#### 控制信号的取值分析

1.   **所有指令执行的共同操作**  

     每一条指令运行的过程都是：Clk信号到来，经过一个Clk-To-Q（锁存延时）之后，PC被写入**指令存储器**，经过取数时间，指令被取出，送入控制器，**在控制器中译码，并且发出控制信号**，之后进入数据通路计算，下一个时钟周期到来，新的数据被写入。

     >   对于R型指令，新的PC很快得到，到那时对于跳转指令，需要等待运算才能得到新的PC值。

2.   **R型指令的执行过程**

     Rd,Rs1,Rs2来自取指令单元（指令存储器），各种控制信号来自控制器。（回顾过程：PC寄存器经过clk2q之后MAR得

     R型指令的执行过程可以概括为：Rigister(rs1,rs2) -> busA,busB->buwW->Rigister(rd)

     ![image-20250428101709013](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250428101709013.png)

     >   留心这些控制信号的取值和含义，比如MemWr应该一定为0，MemtoReg也是为0

     R型指令的时间分析：

     ![image-20250428102812207](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250428102812207.png)

3.   I型指令的执行过程

     Rigister(rs1)->busA,扩展器(imm12)-> ALU-> Rigister(rd)

     ![image-20250428103132649](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250428103132649.png)

4.   U型指令的执行过程

5.   Load指令

6.   Store指令

7.   B型指令

8.   J型指令

9.   最终指令和真值表的取值

     ![image-20250428103320124](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250428103320124.png)因此可以通过极小项写出每一个控制信号的 逻辑表达式

     比如：Branch=op<6>&op<5>&~op<4>&~op<3>&~op<2>&op<1>&op<0>    (B-type)

     Jump=op<6>&op<5>&~op<4>&op<3>&op<2>&op<1>&op<0>           (J-type)

     >   这里没有考虑funct3功能码，是因为B-type指令的op都是1100011，具体功能由funct3决定，即，B型指令的op都相同，只要保证op为1100011时Branch信号为1即可；而J-type的指令没有funct3字段；

     我们依次分析每一个控制信号的真值表达式，最后链接电路：

     ![image-20250428105102309](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250428105102309.png)

#### 时钟周期的设计

时钟周期应该要满足最慢的指令（load）的要求

load指令：（load rd rs1 imm12）

-   clk2q+取指令时间
-   译码时间（控制单元延迟）
-   寄存器读数延迟（得到R[rs1]）
-   ALU延迟（得到addr=R[rs1]+SEXT[imm12]）
-   存储器读数延迟 （读取M[addr]）
-   寄存器setup时间

---



例子：<a id="q"> </a>假设在单周期处理器中，各主要功能单元的操作时间为： 

存储单元：200ps\  ALU和加法器：100ps\ 寄存器堆（读/写）：50ps

假设MUX、控制单元、PC、扩展器和传输线路都没有延迟，则单周期实现方式（每条指令在一个固定长度的时钟周期内完成）中，CPU执行时间如何计算？

那么我们可以确定：

R-type： 取指令200+读rs1、rs2 50+ALU100+写rd 50= 400

Load Word指令：取指令200+读rs1 50+ ALU100+ 存储器读取 200+ 写入rd 50= 600

Store Word指令：取指令200 +   读取rs1，rs2 50 +ALU100 + store 200= 550（注意rs1和rs2的读取是并行的）

Branch： 取指令200+ 读取rs1，rs2, 50 +ALU100 = 350

Jump： 取指令200+ 存入PC+4 50 + ALU计算跳转位置 100 =350；







---

## 多周期CPU设计

下面以实现一个简单的指令系统为例，讲解多周期CPU的设计

>   这个指令系统不用记！！！

![image-20250428112505398](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250428112505398.png)

**多周期的数据通路**

![image-20250428112702885](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250428112702885.png)

### 指令执行的过程

>   Note: 多周期的CPU的时钟周期取的是任何一条指令、所有阶段中最长的那一个；在下面的各种阶段中，取指令阶段因为涉及到一次存储器访问和一次寄存器保存过程，因此耗时最长（访问寄存器的耗时比较长，可以参考<a href="#q">上面的例题</a>



#### 取指令并计算下条指令地址

该阶段对应状态记为IFetch。因为采用定长指令字，故PC增量操作可在取指令阶段完成。取指阶段的功能是：将PC内容作为地址访问主存以取出指令，将指令存入指令寄存器IR中，并将PC+4作为下条指令地址送PC。实现上述功能的有效控制信号及其取值如下。

-   R[IR]<-M[PC]:PCout=1,MARout=0,MemWr=0,IRWr=1。
-   PC<-PC+4:Add1MUX=0,Add2MUX=1,PCWr=1。、
-   其他寄存器写使能信号(如MARWr、CCWr、MDRWr、ALUoutWr、RegWr)全部为0。



---

#### 译码并取数

将IR中的op段送入控制器，得到控制信号；将Rs,Rt输入到寄存器组的Ra，Rb端；

同时会进行“投机计算”：计算Load、Store指令中的地址，并且存放在MAR中。

#### 执行指令

3)执行指令
控制部件对指令译码后，会和条件码中的标志信息组合生成控制信号，从而使CPU在控制信号的控制下执行指令。针对不同指令的功能，其对应的有效控制信号如下。

1.   R-型指令：R[Rt]-R[Rs]op R[Rt]
     R-型指令的执行需要两个时钟周期，对应状态分别记为RExec和RFinish。

     -   RExec状态的功能为：进行ALU运算并将结果存入ALUout和CC寄存器。其有效控制信号及其取值为 BMUX=1,ALUOp=xxx,ALUoutWr=1,CCWr=1,其他寄存器写使能信号全部为0。其中，ALUOp的取值由指令操作码决定，以控制ALU进行不同的运算。
     -   RFinish状态的功能为：将ALUout的内容存入Rt。其有效控制信号及其取值为：RegMUX=1,RegWr=1,其他寄存器写使能信号全部为0。

     问题：为什么不把这两个阶段给合并？如果两个周期合并，可能来不及把异常结果转去进行异常处理，就可能把错误结果写入寄存器了如果Rfinish之后再进入溢出异常处理状态，则需要保证RegWr修改为0；简而言之：为了异常处理。

2.   I-型运算指令：R[Rt]←R[Rs]op EXT[imm16]
     I-型运算指令的执行需要两个时钟周期，对应状态分别记为IExec和IFinish。

     -   IExec状态的功能为：进行ALU运算并将结果存入ALUout和CC寄存器。其有效控制信号及其取值为：ExtOp=0或1,BMUX=0,ALUOp=xxx,ALUoutWr=1,CCWr=1,其他寄存器写使能信号全部为0。与R-型指令一样，ALUOp的取值由指令操作码决定，不同的取值控制ALU进行不同的运算。
     -   IFinish状态的功能为：将ALUout的内容存入Rt。其有效控制信号及其取值为：RegMUX=1,RegWr=1,其他寄存器写使能信号全部为0。经分析可知，IFinish和RFinish两个状态的功能完全一样，因此，可以将两个状态合并成一个状态：RIFinish。

3.   Load指令：R[Rt]-M[R[Rs]+SEXT[imm16]]
     Load指令的执行包含三个子功能，需要三个时钟周期。因为在“译码并取数”阶段已经计算出地址并存入MAR中，因而还需要两个时钟周期，对应状态分别记为lwExec和lwFinish。

     -   lwExec状态的功能为：读主存内容并保存到MDR。其有效控制信号及其取值为：MARout=1,PCout=0,MemWr=0,MDRMUX=0,MDRWr=1,其他寄存器写使能信号全部为0。
     -   lwFinish状态的功能为：将MDR内容存入Rt。其有效控制信号及其取值为：RegMUX=0,RegWr=1,其他寄存器写使能信号全部为0。

4.    Store指令：M[R[Rs]+SEXT[imm16]]-R[Rt]

      Store指令的执行包含三个子功能，需要至少三个时钟周期。因为在“译码并取数”阶段已经计算出地址并存入MAR中，因而只需要两个时钟周期，对应状态分别记为swExec和swFinish。

      -   swExec状态的功能为：将Rt存入MDR并直送总线。其有效控制信号及其取值为：MDRMUX=1,MDRWr=1,MARout=1,PCout=0,MemWr-0,其他寄存器写使能信号全部为0。
      -   swFinish状态的功能为：将MDR送入总线的数据写入主存。其有效控制信号及其取值为：MARout=1,PCout=0,MemWr=1,其他寄存器写使能信号全部为0。

      

5.    Jump指令：PC+PC+SEXT[imm16]
      Jump指令的功能为：进行转移目标地址计算并送PC。它只需要一个时钟周期，对应状态记为JFinish。

      -   其有效控制信号及其取值为：ExtOp=1,Add1MUX=0,Add2MUX=0,PCWr=1,其他寄存器写使能信号全部为0。

      根据上述对每条指令执行过程的分析，得到一个状态转换图。图8.32是一个支持R-型指令、I-型运算指令、Load/Store指令和Jump指令执行的状态转换示意图。

      图中每个状态用一个状态编号和状态名标识，例如，0:IFetch表示第0状态，执行取指令(IFetch)操作，圆圈中示意性地给出了该状态下部分控制信号的取值，其中，有取值为0和取值为1的两种有效控制信号，以及多值有效控制信号ALUOp,ALUOp=xxx表示根据操作码OP译码得到的一个ALU操作控制信号取值为xxx。此外，图中的x表示取值为任意的无效控制信号。

      在图8.31所示的多周期数据通路中，每条指令的执行过程就是图8.32所示的状态转换过程。每来一个时钟，进入下一个状态。从图8.32可看出，R-型指令、I-型运算指令、Load和Store指令的CPI都为4,跳转指令Jump的CPI为3。如果不在译码/取数阶段“投机”计算访存地址，则Load和Store指令的CPI为5。

      ![image-20250428115548563](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250428115548563.png)

---

>   五一假期结束，现在看不懂自己的笔记了

时钟周期的= clock-to-q+setup+longest-delay

注意无论是那一条指令，都有两个步骤是相同的，即IFetch和RFetch/ID，其中IFetch进行取指令，并且计算PC+4；RFetch/ID有‘投机计算’

状态1之后，按照指令的译码进入不同的指令。

除了Jump指令是3个周期之外，所有的指令都是4个周期，即除了Jump的CPI为3其他都是为4

>   如果没有投机计算，那么lw和sw的CPI为5

### PLA控制器的设计

PLA控制器又称为组合逻辑控制器，或者硬连线控制器。

![image-20250509104343151](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509104343151.png)

**下一状态是当前状态和操作码的函数**

我们可以画出一个状态转换表来实现PLA电路，

![image-20250509104713007](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509104713007.png)

硬连线方式可以自行看ppt了解，因为不是重点，故不在这里展示。

特点是：1. 速度快 2. 硬件实现复杂、灵活性差。

### 微程序控制器设计

>   这是一个很有趣的思想，尽管在这里用不上。

基本思想：用微程序来描述机器指令，每一个微程序都有多个微指令，微指令有多个微命令。

每一条微指令和一个状态对应（这里的状态指的是上述的状态转换图的圈圈图）

所有的微程序只存出在制度存储器中，称为控制存储器，Control Storage 简称控存CS。

---

#### 执行指令

-   从CS中取出微程序
-   执行微程序也就是执行其中的微指令
-   对微指令译码就是产生对应的微命令-控制信号
-   按照微命令来执行程序

可以了解一下微程序控制器的基本结构：

其中$\mu$ 开头的代表**微**

![image-20250509110118838](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509110118838.png)

#### 微指令的设计

![image-20250509113020592](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509113020592.png)





>   在这里我就想吐槽了： 也没有铺垫，也没说为什么要在这里将异常处理机制

### 异常处理机制

#### 带异常处理机制的数据通路设计

添加，两个寄存器EPC和Cause，前者存储断点，后者存储异常状态；

同样的，需要添加这两个寄存器的写使能信号，

-   EPCWr：在保存断点的时候有效，存入断点的PC
-   CauseWr： 发现异常的的时候有效，将异常类型存入Cause寄存器

示意图：

![image-20250509114300857](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509114300857.png)

重点关注其中有关Casue和EPC的部分，是在原先的数据通路下添加的。

#### 带异常处理机制的控制器设计

前面数据通路使用到的新的寄存器写使能端信号需要由控制器生成，并且需要设计两个异常状态。

加入异常和中断事件后的状态转换图：

![image-20250509114755501](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509114755501.png)

### 多周期和时钟周期的CPU比较

**多周期的时钟周期是所有阶段的最长值** (就是上面的那个图中所有最长的周期！)

单周期的时钟周期是所有指令中的最大值。（一般是lord指令）

![image-20250509114657162](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509114657162.png)

![image-20250509114650257](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509114650257.png)

---







# 4. 流水线CPU的设计

前面提到，多周期CPU并不能很明显地提升性能，下面介绍流水线CPU。

## 核心思想

流水线CPU的核心思想是，将指令分成不同的阶段，在前一个指令的某一个阶段完成之后，紧接着开始执行下一个指令的这一个阶段。如图，以load指令为例。

![image-20250509115710725](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509115710725.png)



>   必须保证不同阶段不会冲突，即不会用到相同的部件，比如在夏木木寄存器堆的读和写是分开的，可以看成两个独立的部件
>
>   结构冒险：同一个时钟周期内，多个指令都使用了同一个部件。

>   流水线每一个阶段的时间是相同的（都是所有阶段的最大值），应该很好理解，因为是并行执行不同指令的不同阶段，所以必须满足最大的时间要求。

## 与其他CPU比较

性能比较：

![image-20250509115926577](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509115926577.png)

**流水线能够大大提高指令的吞吐率**(单位时间内执行的指令条数)



>   在理想状态下（忽略流水线启动的初始4个周期），流水线一直都是五个部件，每一个周期都有指令执行完成，也有指令开始执行；
>
>   因此流水线CPU的理想下的CPI为1，虽然每一条指令都需要5个周期，但是同时可以执行5个指令，因此CPI为1。
>
>   回顾： 1. 单周期CPU的CPI为1，以最长的指令load来取周期宽度。  2. 流水线的CPU的CPI为1，周期宽度为5个阶段最长的那个（实际执行的时候每一个阶段都会占用一个周期的时间） 3.多周期的CPI需要知道不同指令的比例，jump指令占用3个周期，其他的指令占用四个周期，需要知道比例进行计算。多周期的时钟周期宽度为最长的那个。



 



---

## 指令执行分析

流水线CPU将指令分成以下五个阶段：

Ifetch,Reg/Dec (取数和译码),Exec(执行), Mem（读存储器）, Wr（写寄存器）

先以load指令为例：

>   load rs1 rs2 imm12 RTL功能为 R[rs1]<-M[R[rs2]+STEX(imm12)]

-   Ifetch： 取指令、计算PC+4，需要用到指令存储器、Adder
-   Reg/Dec : 取数并且译码，需要用到寄存器、指令译码器
-   Exec：执行，ALU、扩展器
-   Mem： 数据存储器
-   Wr： 写使能端

>   流水线CPU设计使得每一条指令的执行的时候占用的资源都是不一样的。
>
>   同一个功能部件
>
>   同时被多条指令使用的现象叫做**结构冒险**
>
>   为了流水线能够正常地工作，我们规定：
>
>   -   每一个功能部件在一条指令中 只能使用一次
>   -   每一个部件使用的时候必须在同一个阶段
>
>   我们需要设计每一种类型的指令，使得所有的指令都能符合这个规定



---

### R-Type

R型指令因为不需要进行



![image-20250516105219861](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250516105219861.png)

Ifetch: 取指令 

Reg/Dec：取操作数rs1 rs2，指令译码

Exec：进行运算，使用ALu

Wr：将结果写入目的寄存器





---

### Store

![image-20250516110435256](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250516110435256.png)

Ifetch：取指令并计算PC+4 （写入PC）

Reg/Dec： 从寄存器（rs1）取数，同时指令在译码器进行译码

Exec：12位立即数（imm12）符号扩展后与寄存器值（ rs1 ）相加，计算主存地址Mem：将寄存器（rs2）读出的数据写到主存

---

### I-Type





---

### Beq

与其他指令不同的区别是，Beq中间的Exec阶段需要用到ALU和adder，因此必须单独加上一个adder，防止和其他指令冲突

>   每一个功能部件只能在同一阶段使用、每一个周期只能用一次。即上述的adder只能在第三周期使用。

![image-20250516105727514](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250516105727514.png)

Ifetch: 取指令并计算PC+4 （写入PC，但后续可能需要修改PC）

Reg/Dec:从寄存器（rs1，rs2）取数，同时指令在译码器进行译码

Exec:  执行阶段ALU中比较两个寄存器（rs1，rs2）的大小（做减法）Adder中计算转移地址（PC+SEXT（imm12）<<1）

Mem: 如果比较相等, 则：转移目标地址写到PC

>   这里转移目标地址的方法可以参考单周期的相关指令，通过控制信号生成下一个PC地址

### J-Type

![image-20250516110036021](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250516110036021.png)

`Ifetch`: 取指令并计算PC+4 （写入PC ，但后续肯定需要修改PC ）

`Reg/Dec:`从寄存器取数，同时指令在译码器进行译码

`Exec`:  执行阶段ALU中计算PC+4（准备写入rd）Adder中计算转移地址（PC+SEXT（imm20）<<1）

`Mem`:把转移地址写入PC

>   PC可以修改多次，因为更新PC的时候前一个PC已经没有用了，不会出现冲突。

`Wr`: 把ALU运算结果（PC+4）写入rd.

---

## 数据通路设计

![image-20250516111552870](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250516111552870.png)

和单周期的区别在与中间的`流水段寄存器`，用于保存每一个周期的执行结果，属于内部寄存器，可以理解为，每一个寄存器里面存储的都是某一条指令的当前状态（寄存器和它右边的部分属于当前状态）。

>   "The pipelined datapath consists of combination logic blocks separated by pipeline registers. If you get rid of all these registers (not the PC), this pipelined datapath is reduced to the single-cycle datapath."

>   ppt中还提到了其他的一个细节：下一个clock tick来临之后需要一个clock-to-Q才能进行下一阶段（或者说写入下一个阶段）

### IUnit设计

![image-20250516114408758](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250516114408758.png)

在IF/ID寄存器中存储有PC和指令

IF段的功能PC+4、取指令 

### Reg/Dec

在ID/EX寄存器中，存储`R[Rs1], R[Rs2], Rd, Imm, PC`

### Exec Unit的设计

>   详细内容请见ppt，不同的指令需要的信号来自不同的地方
>
>   可以留心的是，这里使用了Adder和ALu，进行并行计算，因为前面有一个步骤在这里需要同时进行两个计算（如果都用ALU算的话，显然会冲突）。

![image-20250516115523660](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250516115523660.png)

在EX/M寄存器中存储了，跳转地址、Zero、ALU运算结果、busB、rd

---

### M段

### WB写回段





>   1.   M段有PC写回的操作，出现数据回流，可能出现结构冒险
>   2.   WB段可能有写入寄存器的操作，也可能会出现结构冒险的问题

---

## 流水线中的Control Signals

1.   PC不需要写使能
2.   流水段寄存器不需要写使能信号

在流水线中的控制信号：

![image-20250523104536906](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250523104536906.png)

1.   每一个时钟周期到来，五个流水段寄存器都会进行更新，所有的控制信号在ID阶段**一次性生成**，main control的设计和单周期的控制器设计原理一模一样。
2.   任何一条指令在执行的过程中，其信号是不变的（在ID阶段一次性生成，之后不需要的信号不再保存）



## 流水线举例

最开始的时候，将流水段寄存器都初始化为0，保证了不会出现错误的写入等等。

以下面的这个流水线为例

![image-20250523105300126](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250523105300126.png)

分析指令的运行结果：

1.   第一周期
2.   第二周期
3.   第三周期
4.   第四周期
5.   第五周期
6.   第六周期
7.   第七周期

注意：

1.   只有在B、J型指令在M阶段的时候才会将新的PC更新为Target，此后下一个周期新出现的指令就是target对应的指令。也就是和target指令之间间隔了3个指令。（取错了3个指令，称之为`控制冒险`）
2.   load指令尽管在第一周期就被取出，但是数据在第五周期才写入，在第六周期才能使用，期间可能会错误访问这个数据得到的不是目的结果，称为`数据冒险`

### 单周期vs流水线计算机的性能比较

**流水线除了要考虑每一个阶段的最多时间，但是还要考虑流水段寄存器的延迟，具体看是不是**

## 流水线的冒险和处理

>   这里是本书最后一个知识点，最后一个高级CPU不会涉及

hazard：流水线无法正确执行后续指令，或者执行了不该执行的指令。

冒险有：

1.   结构冒险：同一部件在同时被多个指令所使用
2.   数据冒险：后面的指令使用用到了前面还没有生成的数据
3.   控制冒险：在跳转或者处理异常的步骤中，后续指令仍然被错误地取出

### 结构冒险的解决

**确保每一个指令只会在特定的阶段被使用**

### 数据冒险的冒险

给定下面的一串指令序列

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250523113752599.png" alt="image-20250523113752599" style="zoom:25%;" />

由于add指令需要在第五个周期才能写入新的数据，此时xor指令在IF阶段，到了第六周期的时候，xor指令处于ID阶段，从寄存器堆中取数计算。

---

#### 解决方法一：硬件阻塞stall

硬件上强制要求阻塞，效率低下

![image-20250523114516205](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250523114516205.png)

#### 解决方法二：软件上插入无关指令

在编译器中插入空指令NOP，在会出现数据冲突的时候插入空指令。编译时间增加，速度也不是很快。

#### 解决方案三：同一周期内寄存器先写后读

方案三需要和1或者2合作，改为阻塞两个周期，因为要求先写后读，这样使得ID段指令读到的值是当前M段指令写入的值。

#### 解决方案四：转发

将ALU的A，B端增加mux，允许从其他的流水段寄存器（第五阶段`WB`在写的时候已经有数据了，可以将这个数据送到前面去）进行读取数据，进行运算。
