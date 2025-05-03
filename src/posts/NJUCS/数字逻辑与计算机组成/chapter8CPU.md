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

