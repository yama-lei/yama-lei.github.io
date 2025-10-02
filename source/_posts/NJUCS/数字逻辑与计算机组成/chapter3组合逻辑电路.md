---
title: 组合逻辑电路
categories:
  - NJUCS
  - 数字逻辑与计算机组成
date: 2025-03-07 00:00:00
---
## 第一讲 | 组合逻辑电路概述 
数字逻辑电路分为**组合逻辑电路**和**时序逻辑电路**
-   组合逻辑电路：输出只依赖于输入
-   时序逻辑电路：输出和输入、电路状态有关

>   1.   CPU是时序逻辑电路
>   2.   组合逻辑电路和时序逻辑电路混在一起用也是时序逻辑电路

### 组合逻辑电路构成规则

1.   元件是组合逻辑电路

2.   输出端只能相互连接 | 即，每一个点的信号来源只能有一个

     >   也就是多个组件的输出不连在一起

3.   输出节点不能反馈到输入端

     >   也就是不能输出不能"回头"

### 逻辑电路图

一个逻辑电路对应一个逻辑表达式（单输出）

一个元件可以是多个逻辑电路图和在一起，比如有多输出的元件。

**扇出系数**： 一个逻辑门允许的最大输入数目

**扇出系数**：最大输出数目

#### **画逻辑门**

-   根据优先级
-   **非>与、与非 >异或、同或 >或、或非**

-   多位二进制运算，需要标志位数：

![image-20250307113324303](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250307113324303.png)

### 多级逻辑电路

**门的传播延迟 | 门延迟**： 输入信号改变到输出信号发生改变之间的时间；

**任何逻辑电路都可以是两级电路**：可以画真值表，再写成**与-或表达式**或**或-与表达式**

>   将多级变成两级：
>
>   -    减少时间延迟，提高速度
>   -   增加电路的复杂程度；使用的电路硬件数目会增加
>   -   速度up，成本up

### 组合逻辑电路设计

1.   逻辑抽象
2.   真值表
3.   卡诺图化简
4.   画图 

>   注： 任何表达式都可以化简成为二级**与-或**表达式，将与或表达式两次取反，可以得到**与非 -与非**表达式；

**示例：红绿灯正常工作状态**

1.   数字抽象：三位输出，每一位代表一个灯，每个灯要么亮要么关（0 or 1）

2.   真值表和卡诺图：

![image-20250310101940750](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310101940750.png)

最后得到F的表达式（最简表达式）

**两级的与-或表达式可以变成与非-与非表达式**：通过两次取反！
$$
F= \overline{\overline{\overline R \cdot \overline{Y} \cdot \overline{G}} \cdot \overline{R \cdot Y} \cdot \overline{R \cdot G} \cdot \overline{Y \cdot G} }
$$


### 无关项，非法值，高阻态，三态门

#### **无关项**

-   **不在乎的输入组合**即是无关项：压根不会出现的输入组合，或者没有影响的项；如BCD码里面大于1001的编码都是无关项。
-   无关项在真值表中用d表示，意思是0 or 1毫不关心。
-   无关项在卡诺图中**可以全部填上**，如果这有利于你化简卡诺图的话。你只需要在乎真的输出为1的项，无关项你可以选择是否保留，**只要有利于你化简**。



#### **非法值**

-   既不是0也不是1

#### **高阻态**

-   处于一种非正常状态的第三种电气态，**电路就项断开一样**

#### **三态门**

-   一种总线接口电路，可以输出0,1，高组态

-   有一个**输出使能控制端** EN

    <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310103629211.png" alt="image-20250310103629211" style="zoom:33%;" />

-   使用例子：用于连接总线，多个三台逻辑连接在一起，使得每一次，只能有一个输入端可以输入总线。

-   三态门有两种，一种是当使能端为H时可以工作，另一种是当其为L时工作。

-   使能端也可以同时有多个，比如有三个使能端G,G2A_L,G2B_L，则只有为1 0 0的时候才能正输出0 or 1。 ）

-   在将EN端写入真值表后，每一个最小项、最大项都要将EN的输入考虑进去；

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310110012505.png" alt="image-20250310110012505" style="zoom:33%;" />

根据这个，可以写出：
$$
Y0=\overline{EN}+ EN \cdot \overline{A1} \cdot A0+ EN \cdot A1 \cdot \overline{A0}+EN \cdot A1  \cdot A2
$$

>   需要将EN端也要考虑到这里的输出表达式；因为EN端相当于也是一个输入端

## 第二讲 | 典型组合逻辑部件

### 译码器

-   多数入，多输出；通常是$n-2^n$ 型；
-   最简单的译码器：从$2^n$ 个输出端中，选择一个输出；即，根据输入的数据，"翻译"出对应的输出信号。
-   每一个输出都对应了一个数字逻辑电路，多输出有多个电路，最后将其组合在一起

**应用实例**： 数字灯

1.   输入信号：四位二进制，代表0-9；多出来的几种表示一些字母（图中有）

2.   输出信号：a~g的输出信号，代表 a~g的对应的管子是否亮；

3.   真值表：

     <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310111606460.png" style="width: 50%"/>

<center>（多出来的A b C d E F，如果不需要的话，可以当成<em>无关项</em>）</center>

4.   最后可以画卡诺图(以a为例)

![image-20250310112019639](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310112019639.png)

---

### 编码器

实现$2^n-n$的编码

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310112417722.png" style="width: 50%"/>

<center>示意图</center>



#### 互斥编码器

所有输入端互斥，只能有一个为高电位，其余都是低电位；这一个低电位，映射得到n个输出的结果；



<div style="display:grid; grid-template-columns: 1fr 1fr 1fr;">
<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310112449336.png"/>
<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310112458266.png"/>
<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310112512746.png"/>
</div>

<center>真值表是简化的</center>

#### 优先级编码器

-   输入端可以有多个高电位
-   按照输入端的优先级来决定输出什么

<div style="display:grid  ;grid-template-columns: 1fr 1fr">
    <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310113140218.png"/>
    <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310113149719.png"/>
</div>

>   真值表 和 示意图

### 多路选择器

-   多个输入，一个输出，通过控制端来决定输出哪个；
-   输入端和输出端的**位数要一致**；但是，控制端的位数可以和输入输出端不一致；

选择器的实现：

![image-20250310114125426](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310114125426.png)

<center>1位2路选择器</center>

![image-20250310114250807](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310114250807.png)

<center>1位4路选择器</center>

多路选择器还可以实现类似门电路的性质：

![image-20250310114759765](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250310114759765.png)

### 多路分配器

将一个输入信号，输出到某一个输出端里面；具体输出到哪个电路，由控制端决定;

**一个输入，多个输出，其中某一些为1**

### 半加器、全加器

#### 半加器 HA （Half Adder） 

只考虑加数和被加数，**不考虑低位的进位**；
$$
F= A  \oplus B
$$
 当前数字为F
$$
cout=A \cdot B
$$
进位为cout

#### 全加器FA （Full Adder)

考虑加数、被加数和低位的进位；
$$
F= A  \oplus B \oplus Cin
$$
含义是，A，B，Cin如果只有一个或者有三个为1，则F为1；

>   在数学中，异或就是模二加法，因此$A \oplus B \oplus Cin$就是三个相加对2取模，取模即进位

输出为：
$$
cout=A \cdot B+A \cdot cin+B \cdot cin
$$
含义是，A，B，Cin如果有两个以上为1，则F为1；

## 第三讲 | 组合逻辑电路的时序分析

#### tpLH和tpHL

**tpLH**是`上升沿电路延时`，从输入信号改变到输出信号由Low变High的时间

**tpHL**是`下降沿电路延时`，从输入信号改变到输出信号由High变Low的时间

![image-20250314100910471](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250314100910471.png)

<center>通常，我们忽略上升下降的过程</center>

#### 传输延迟 和 最小延迟

传输延迟 | Propogation delay `Tpd`：由输入信号改变到**所有**输出端得到**稳定**的信号所需的时间；

最小延迟 | Contamination delay `Tcd`：由输出信号改变到**任何一个**输出信号**开始改变**所需的时间； 

关键路径： 从输入端到输出端的**最长路径** ；整个电路的传输延迟的时间即关键路径上所有的元件的**传输延迟之和**

最小路径：电路的最小延迟是最短路径上所有的元件的最小延迟之和

**例子：**

假设每一个逻辑门电路的传输延时和最小延时分别是90ps和60ps；求下面这个电路的传输延迟和最小延迟

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250314102739355.png" alt="image-20250314102739355" style="zoom:33%;" />

1.   关键路径：必须经过3个逻辑门，则tpd=90ps*3=270ps；
2.   最小延迟：至少经过2个逻辑门，则tcd=60ps*2=120ps；

>   最小延迟只是 有输出信号所需的最小时间，此时**输出的并不是最终稳定的结果**

#### 竞争与冒险

某个输入信号通过多个路径作用到输出端，由于延迟不同，导致输入信号对于输出端造成不同的影响，称为**竞争**

由于竞争，在输入信号发生变化的时候  输出端短时间可能出现不正确的电路信号，称为**毛刺**

有毛刺，称为存在**冒险**

<div style="display:grid;grid-template-columns: 1fr 1fr 1fr;">
    <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250314103910590.png"/>
    <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250314103926203.png"/>
    <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250314103936138.png"/>
</div>

<center>在A段从高点位变成低电位时出现竞争冒险</center>

**判断出现竞争、冒险**

1.   如果将逻辑表达式固定一个变量，其余变量任取，如果出现$X \cdot \overline X$或$X + \overline X$ 那么存在毛刺
2.   **如果卡诺图里面任何两个相邻的1没有包含在同一个卡诺圈中**

**消除竞争冒险**

1.   增加冗余项 （在卡诺图中多加几个圈，使得全部相邻的1都被包在一起）
2.   低通滤波

