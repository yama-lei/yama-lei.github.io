---
title: 数字逻辑与计算机组成实验
---

## 实验一

## 学习logisim

在使用logism之前需要学习相关内容，并配置相关环境。

### 环境搭建

最简单的汉化版本：[SecondCat/Logisim-Translation-Chinese: Based on Logisim 2.7.1, providing Chinese, integrated JRE.](https://github.com/SecondCat/Logisim-Translation-Chinese/releases/tag/v1)

安装后，在导航栏->window->reference中更改。

### 线的颜色

在Logisim中，导线的颜色表示不同的状态和信号值。蓝色导线在布线和仿真过程中有不同的含义。

布线时的蓝色导线

在布线过程中，蓝色导线表示该点的值未知。这通常发生在布线尚未完成或某些连接未正确建立时。布线完成后，蓝色导线应消失，表示所有连接都已正确建立。

仿真时的蓝色导线

在仿真过程中，蓝色导线不应出现。如果在仿真过程中看到蓝色导线，可能意味着某些输入或输出未正确初始化或连接。此时，可以使用戳工具（Poke Tool）点击引脚（Pin）以改变其值，从而消除蓝色导线。

其他颜色导线的含义

除了蓝色导线，Logisim中还有其他颜色的导线，每种颜色表示不同的状态：

-   **灰色导线**：表示未连接到任何东西。
-   **浅绿色导线**：表示连接两端为高电平1的线[1](https://blog.csdn.net/a_vegetable/article/details/108920553)。
-   **深绿色导线**：表示连接两端为低电平0的线[1](https://blog.csdn.net/a_vegetable/article/details/108920553)。
-   **黑色导线**：表示多位线路传输，不管每路电平高低都为黑色[1](https://blog.csdn.net/a_vegetable/article/details/108920553)。
-   **红色导线**：表示布线错误，产生冲突[1](https://blog.csdn.net/a_vegetable/article/details/108920553)。

### 选择组件

选择组件的时候，可以看看配置是否正确：

![image-20250305084347837](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250305084347837.png)

![image-20250305084410175](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250305084410175.png)

如果不是自己想要的，一定要记得自己改掉！

其中NMOS和PMOS的方向指的是**漏极的朝向**！

>   NMOS的朝向向上，PMOS的朝向向上

![image-20250305090935185](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250305090935185.png)

（仔细看上面PMOS和CMOS的区别）



### 思考题

如何实现二进制和格雷码之间的转换？

-   二进制转格雷码：

​	<img src="https://pic3.zhimg.com/v2-91a33445bf255814266d3ef3882b5058_1440w.jpg" alt="img" style="zoom: 33%;" />

-   格雷码转二进制：

    <img src="https://pic4.zhimg.com/v2-686a9ef84945949b1f0ab8c17f45badf_1440w.jpg" alt="img" style="zoom: 33%;" />





## 实验二

开始上强度了，需要注意的是，一定要小心**没注意到的线交叉**，建议开启电路仿真，往死里测试；

### 加减法器

~~没看题目，原来要作**加减法**器~~

加法器做好了以后，减法器就是采用补码的方式，用加法得到减法的值
$$
A-B=A+(\overline B+1)
$$
注意，那个**加一** 可以直接是由加法器的cin得到；

### 汉明码校验

原理：

>   # Calculating the Hamming Code
>
>   The key to the Hamming Code is the use of extra parity bits to allow the identification of a single error. Create the code word as follows:
>
>   1.  Mark all bit positions that are powers of two as parity bits. (positions 1, 2, 4, 8, 16, 32, 64, etc.)
>   2.  All other bit positions are for the data to be encoded. (positions 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, etc.)
>   3.  Each parity bit calculates the parity for some of the bits in the code word. The position of the parity bit determines the sequence of bits that it alternately checks and skips.
>       Position 1: check 1 bit, skip 1 bit, check 1 bit, skip 1 bit, etc. (1,3,5,7,9,11,13,15,...)
>       Position 2: check 2 bits, skip 2 bits, check 2 bits, skip 2 bits, etc. (2,3,6,7,10,11,14,15,...)
>       Position 4: check 4 bits, skip 4 bits, check 4 bits, skip 4 bits, etc. (4,5,6,7,12,13,14,15,20,21,22,23,...)
>       Position 8: check 8 bits, skip 8 bits, check 8 bits, skip 8 bits, etc. (8-15,24-31,40-47,...)
>       Position 16: check 16 bits, skip 16 bits, check 16 bits, skip 16 bits, etc. (16-31,48-63,80-95,...)
>       Position 32: check 32 bits, skip 32 bits, check 32 bits, skip 32 bits, etc. (32-63,96-127,160-191,...)
>       etc.
>   4.  Set a parity bit to 1 if the total number of ones in the positions it checks is odd. Set a parity bit to 0 if the total number of ones in the positions it checks is even.
>
>   Here is an example:
>
>   A byte of data: 10011010
>   Create the data word, leaving spaces for the parity bits: _ _ 1 _ 0 0 1 _ 1 0 1 0
>   Calculate the parity for each parity bit (a ? represents the bit position being set):
>
>   -   Position 1 checks bits 1,3,5,7,9,11:
>
>       **?** _ **1** _ **0** 0 **1** _ **1** 0 **1** 0. Even parity so set position 1 to a 0: **0** _ **1** _ **0** 0 **1** _ **1** 0 **1** 0
>
>   -   Position 2 checks bits 2,3,6,7,10,11:
>       0 **? 1** _ 0 **0 1** _ 1 **0 1** 0. Odd parity so set position 2 to a 1: 0 **1 1** _ 0 **0 1** _ 1 **0 1** 0
>
>   -   Position 4 checks bits 4,5,6,7,12:
>       0 1 1 **? 0 0 1** _ 1 0 1 **0**. Odd parity so set position 4 to a 1: 0 1 1 **1 0 0 1** _ 1 0 1 **0**
>
>   -   Position 8 checks bits 8,9,10,11,12:
>       0 1 1 1 0 0 1 **? 1 0 1 0**. Even parity so set position 8 to a 0: 0 1 1 1 0 0 1 **0 1 0 1 0**
>
>   -   Code word: 011100101010.
>
>   
>
>   ## Finding and fixing a bad bit
>
>   The above example created a code word of 011100101010. Suppose the word that was received was 011100101110 instead. 
>
>   Then the receiver could calculate which bit was wrong and correct it. The method is to verify each check bit. Write down all the incorrect parity bits. 
>
>   Doing so, you will discover that parity bits 2 and 8 are incorrect. It is not an accident that 2 + 8 = 10, and that bit position 10 is the location of the bad bit. 
>
>   In general, check each parity bit, and add the positions that are wrong, this will give you the location of the bad bit.
>
>   ## Try one yourself
>
>   Test if these code words are correct, assuming they were created using an even parity Hamming Code . If one is incorrect, indicate what the correct code word should have been. Also, indicate what the original data was.
>
>   -   010101100011
>   -   111110001100
>   -   000010001010

简单来说，就是有一种特殊编码，叫做汉明编码，在原先数据的基础上，加上几位**校验码**，得到一种新的编码；

将收到的汉明码重复计算一次校验码，和原先的校验码进行比较，得到**错误字**，错误字的数值代表了出错的位置。

>   因为校验码的位置都是2的n次幂，所以当故障字中只有一位为1时，说明是校验位出错，否则就是数据位出错。

### 四位奇偶校验电路

![image-20250320221820983](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250320221820983.png)

疯狂取异或就行。

---

## Lab3

**算数左移，逻辑右移，循环左移？**

1.   算数左移、右移： 普通的移位并且补0
2.   逻辑左移：符号位不变，其他的地方正常移，末尾补零
3.   逻辑右移：补符号位
4.   循环左移、右移：都是将移出的位数放回
