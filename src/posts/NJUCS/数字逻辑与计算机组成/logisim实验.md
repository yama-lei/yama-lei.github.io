---
title: 数字逻辑与计算机组成实验
---

# 实验一

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

