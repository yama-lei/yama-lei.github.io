---
title: FPGA设计和硬件描述语言
date: 2025-03-24
---

这一章不是重点。

<!--more-->



## PLD 器件

简单了解一下PLD的画法：

![image-20250324105932569](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250324105932569.png)

注意，**列阵表示**的含义：第一个`固定连接`和之后所有的`可编程连接`的变量都相连，相连的方式是右侧具体的逻辑门。

### 可编程逻辑阵列（Programmable Logic Array，PLA）是一种与阵列、或阵列都可编程的逻辑阵列:

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250324111338892.png" alt="image-20250324111338892" style="zoom:33%;" />

### 存储器阵列

存储器阵列可以用于存储大量数据，但是读取速度比寄存器稍慢：





按照功能，可以分为ROM和RAM

**ROM**：Read-Only-Memory

ROM根据晶体管的有无，来存储01.

RAM：

RAM又可以区分为SRAM(静态的RAM)，和DRAM（动态的RAM）。

### FPGA程序设计

>   Field Programmable Gate Array，FPGA	

​	



---

下面JacyCui的笔记作为补充：

# Chapter 05 FPGA设计和硬件描述语言



**崔家才 201220014**



## 1 可编程逻辑器件

**可编程逻辑器件(Programmable Logic Device, PLD)**：主要由与阵列和或阵列构成，逻辑门可以通过编程开关连接，以形成所需要的逻辑电路。

**可编程只读储存器(Programmable Read Only Memory, PROM)**：与阵列固定，或阵列可编程的简单PLD，将逻辑表达式转化成标准与-或表达式之后可以很容易的由PROM实现。

**可编程逻辑阵列(Programmable Logic Array, PLA)**：与阵列和或阵列都可以编程的逻辑阵列。用PLA实现逻辑函数时，只需要讲逻辑表达式转化成最简与-或表达式即可。

**可编程阵列逻辑(Programmable Array Logic, PAL)**：与阵列可编程，或阵列固定的PLD。

**通用阵列逻辑(Generic Array Logic, GAL)**：可擦写、可重复编程、设置加密、输出端设置了可编程的**逻辑宏单元(Output Logic Macro Cell, OLMC)**。

**复杂可编程逻辑器件(Complex Programmable Logic Device, CPLD)**：**逻辑阵列块(Logic Array Block, LAB)** + I/O控制块 + 可编程互联阵列(PIA)。

**现场可编程门阵列(Field Programmable Gate Array, FPGA)**：基于查找表(Look-Up Table, LUT)技术构建的集成度更高的CPLD。



## 2 储存器阵列

**随机存取储存器(RAM)**：

- **静态RAM(Static RAM, SRAM)**：MOS管较多，占硅片面积大，因而价格高、功耗大、集成度低；但无需刷新和读后再生；特别是它读写速度快，其储存原理可看作RS触发器的读写过程
- **动态RAM(Dynamic RAM, DRAM)**：MOS管少，占硅片面积小，因而价格便宜、功耗小、集成度高；但必须定时刷新和读后再生；特别使它的读写速度相对于SRAM慢，其储存原理可看作电容的充放电过程

**只读存储器(Read Only Memory, ROM)**



## 3 专用集成电路

**专用集成电路(Application-Specific Integrated Circuit, ASIC)**：应特定用户要求和特定电子系统的需要而设计、制造的集成电路







