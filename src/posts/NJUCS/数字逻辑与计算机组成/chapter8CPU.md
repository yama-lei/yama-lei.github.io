---
date: 2025-04-21
title: chapter8 | CPU的设计
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

### 控制器的设计

前面提过，CPU的核心是数据通路（执行部件）和控制器（控制部件），前面已经设计好了数据通路，但是数据通路中的很多信号，比如ALUctr需要控制器的作用。

#### 控制信号的取值分析

每一条指令运行的过程都是：Clk信号到来，经过一个Clk-To-Q（锁存延时）之后，将当前PC的值写入指令寄存器，取出指令，送入控制器，在控制器中译码，并且发出控制信号，之后进入数据通路计算，下一个时钟周期到来，新的数据被写入。
