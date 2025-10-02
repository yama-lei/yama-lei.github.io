---
title: 普通物理学期末复习
author: Yama
categories:
  - NJUCS
  - 普通物理学（上）
---

本文为南京大学计算机科学与技术专业 普通物理学（上）期末复习总结。 全文约5000字，阅读时间20min

## 期末划重点

<div style="
  font-weight: bold;
  padding: 8px 15px;
  border-left: 5px solid #e91e63;
  display: inline-block;
">
  下面是考试的重点
</div>

7.3 **静电场的高斯定律** **可能会考多次**

7.4 **静电场的环路定理、电势**

7.6 **静电场中的电介质** **球充电问题是重点**

7.7 电容是次重点

7.8 静电场中的电介质（球计划电荷密度、充入介质求D、E之间的关系等等）

8.4 **恒定磁场的安培环路定理**（根据电流算磁场）

8.5 可能考洛伦兹力

> “不是期中考过的就一定不考，可能涉及牛顿第二定律”--zj 

**9.1 电磁感应定律**

**9.2 动生电动势**

<div style="
  font-weight: bold;
  padding: 8px 15px;
  border-left: 5px solid #e91e63;
  display: inline-block;
">
  下面绝对不考
</div>

8.7、8.8、8.9、9.4之后的内容

不难发现，重点很少，说明：1. 每一个知识点出现的可能性更大 2. 不排除出一些小知识点

---

这些内容是大部分学生走了以后，学生问的一些问题，这里只给出一些回答

“物理会出一道难题，难在物理概念，而不会难在积分上面，就比如可能阿爸这个题目换一个情境，换成一个三角形，或者一个圆形，稍稍灵活一点”

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618155951037.png" alt="image-20250618155951037" style="zoom: 25%;" />

> 图为老师讲这段话的时候随手翻出来的题目

证明题也有可能，几年前就出过证明题，证明为什么导体表面的电场是垂直表面的。

梯度算符一般不考，优秀比例不超过20%，这是教育处规定的，但是最后会高于，高于ta也不管。

> 说到这时，zj老师露出了笑容

## 知识点复习

### 静电场

**熟知结论：**

1. 无线长直导线距离a的地方电场$E = \frac{1}{4 \pi \epsilon _0} \cdot \frac{2\lambda}{a} $
2. 无线大均匀带点版距离a的地方电场为$E= \frac{\sigma}{2\epsilon}$ **匀强电场，和距离无关。**
3. 平行板电容器，采用上面的叠加，中间部分为$E=\frac{\sigma}{\epsilon _0}$,两板的外面为$E= \frac{\sigma}{\epsilon _0}$
4. 带电球面表面电势为$\frac{q}{4\pi \epsilon _0 R}$ (和在中心的等大电荷产生的一致)
5. 静电平衡的球壳对于其内部的电势贡献为$\frac{1}{4\pi \epsilon _0}\cdot \frac{q}{r0}$,对外部的贡献为$\frac{1}{4\pi \epsilon _0}\cdot \frac{q}{r}$
6. 多个带电平行板平行排列满足以下规律：
     - 相对的两个面电荷密度相同、电荷量相反
     - 最外侧的两个面所带电荷量相同（通过对最外侧的带点板进行叠加原理分析即可）
     - 每一个平行板内部的电场均为0

**电场的计算-积分方法**

经典题型：

1. 电偶极子
2. 均匀带点直棒
3. 均匀带点圆环
4. 均匀带电圆盘



**电场的计算-高斯公式**

> **使用公式的时候，一定要说明用的是什么公式！不然老师怎么捞？？？**

高斯公式：电场的源是电荷，E的二型曲面积分等于电荷除以epsilon_0

步骤：

1. 分析对称性
2. 做高斯面
3. 使用高斯定理得到答案



**电场的计算-叠加原理**

例题一：

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618200246197.png" alt="image-20250618200246197" style="zoom:33%;" />

例题二：

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618200939682.png" alt="image-20250618200939682" style="zoom:33%;" />



> 注意，电场是有方向的，如果题目要求xx的产生的电场强度，通常需要考虑分析对称性，算出所有位置的电场强度（对称性

例题三：求一无限长，半径为R 直圆柱带电体的电场单位长度带电 $\lambda$ 的的电场强度。

![image-20250618202225037](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618202225037.png)

**电势的计算-叠加原理**

1. 电偶极子产生的电势

2. 均匀带电圆环在中垂线上产生的电势

3. 多球壳叠加 直接记结论 考试推导一秒都是对记忆力的不尊重<del>挺好记的</del>

     ![image-20250618204022740](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618204022740.png)

**电势的计算-积分方法**

1. 均匀带电球面、带点球体产生的电势 使用公式$\varphi= \int_x^{+\infty} Edx$ (假定积分收敛、设无穷远处为0)
2. 计算无线长直导线的电势（此题有坑，积分不收敛。。不能选择无穷远处为参照）
3. <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618214421053.png" alt="image-20250618214421053" style="zoom:25%;" />叠加原理能做的，我积分也能做



**静电平衡-叠加原理**

![image-20250618221125925](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618221125925.png)

加问：如果外表面接地呢？

> **接地只能保证电势为0，电荷的分布需要依靠高斯定理+电势的定义来推导**

![image-20250618222712248](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618222712248.png)

答案：叠加原理大法！

![image-20250618222750481](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618222750481.png)

再拓展，如果加上接线呢？

![image-20250618223543731](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618223543731.png)

难点：如何运用叠加原理![image-20250618224518529](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250618224518529.png)

一般性结论：1. 相对的平面带有等量异号电荷。 2. 最外侧两个面带等量同号电荷。

这个题目没有说明空腔的位置，是否可以直接用对称性+高斯公式呢？

![image-20250619103723777](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619103723777.png)

>   zj: 这个题不考；其实外面的电场也是均匀分布的，但是内部比较复杂了

### 电介质

**熟知知识点**

极化强度P：定义为单位体积内的电偶极距 (只有电介质内部才有极化强度、真空的极化强度为0)
$$
\int P d S=-Q  \\
\sigma '= P \cdot n ~~~\text{感应电荷密度等于P和外法向量的点积} \\
P=\epsilon_0 \chi (E_0+E') ~~~~~\text{这里E'代表的是激化电荷产生的电场}\\
\int Dd S=\Sigma q_i \\
\chi +1=\epsilon _r \\
D= \epsilon _0 E +P= \epsilon _0E+ \epsilon _0 \chi  E=\epsilon _0 (1+\chi)E=\epsilon _0 \epsilon _rE= \epsilon E
$$


解题一般思路：

1. 如果知道$q0, \epsilon _0$则可以求出D，因为D对S的二型曲面积分等于q0，相当于自由电荷是电位移线的源头

2. D和P、E有固定的大小关系：
     $$
     P=\epsilon _0 \chi E~~~~~~~~~~~~~~~ D=\epsilon _0 E+P ~~~~~~~~~~~~D= \epsilon  E ~~~~~~~~~~~~~~~P=\frac{\chi}{1+\chi}D
     $$

3. $\epsilon ~ \epsilon _0 ~ \chi$三者知一求二

     ![image-20250619153923724](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619153923724.png)

4. D和自由电荷相关联、P和极化电荷相关联，E是沟通二者的桥梁：$P= \epsilon _0 E ~~ D=\epsilon E$

> 吐槽一下垃圾搜狗输入法，并且吐槽一下世界上就没有适合我的用的输入法了吗？

**电介质-例题**

分析有介质存在的电容器



分析如图题目，注意除了球壳内部带有电介质，其余部分不含电介质（即真空）![image-20250619152617537](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619152617537.png)



### 电容器&静电场的能量

**知识点回顾**
$$
C=\frac{Q}{V}=\frac{\epsilon S}{d}~~~\\ \text{前者为定义式，后者为决定式，均可以求电容；电容的含义是升高单位电压所需要的电荷量}
$$
加入电介质可以提升电容，因为$C=\frac{\epsilon S}{d}$，改变了期中$\epsilon$的值。

电荷系统的电能$E= \frac{1}{2}\Sigma q_i V_i$

电容的电量$E= \int CUdq=\frac{1}{2}CU^2$ <a href="#2">例题</a>

能量密度$w= \frac{1}{2}DE=\frac{1}{2}\epsilon E^2$  ,对空间进行积分即可，<a href="#1">例题</a>



**电容-例题**

1. 求半径为R的孤立导体球的电容；

> 解：因为表面电势为$\frac{1}{4 \pi \epsilon}\cdot \frac{q}{R}$,而电荷量为q，因此C=$4\pi \epsilon$

2. 求平行板电容器的电容，已知电荷密度、S、d；

> 由高斯定理易得$E= \frac{\sigma}{\epsilon}$,所以$U=Ed=\frac{\sigma d}{\epsilon}$,so $C=\frac{Q}{U}=\frac{\sigma S}{\frac{\sigma d}{\epsilon}}=\frac{\epsilon S}{d}$

3. 求同心球壳的电容，内外半径分别为R1 R2

> 容易求得两球壳之间的电场强度$E= \frac{q_0}{4\pi r^2 \epsilon}$

4. 个人觉得大概理解这个意思就行，无需关心这里的结果，毕竟这个积分如果从0积到d不收敛，这里取的是a~d-a，可能是考虑了线的粗细，也许是因为![image-20250619160504951](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619160504951.png)

**电场能量-例题**<a id="1"> </a>

注意，这是一个圆柱

![image-20250619162229237](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619162229237.png)

> 思考，如果是一个充满介质的球壳呢，假定带电荷量为q

求均匀带电球体的电场能量，半径为R，电荷量为q<a id="2"></a>

>   $$
>   \frac{3q^2}{20\pi R \epsilon _0} ~~\text{解析略}
>   $$

求将平行板空气电容器的间距从d拉开到2d所需做的功，面积为S

>   将两个状态的能量作差即可，答案略

### 电流与磁场

**知识回顾**

洛伦兹力：F=qvB(v和B是叉乘)

>   注意：方向与q的正负有关！使用右手螺旋的时候可以从I的方向往B的方向握

电流的磁效应：电流产生磁场

毕奥—萨伐尔定律：
$$
dB = \frac{\mu _0}{4\pi }\cdot \frac{Idl*e_r}{r^2} ~~\text{这里的*代表叉乘，因为我不记得叉乘怎么打了，回头让ai改改吧}
$$

>   注意，这里的r向量是从电流指向待求B的地方

变式（运动电荷产生的磁场）：
$$
B_{q}=\frac{\mu}{4\pi}\cdot \frac{qv*r}{r^3} ~~\text{同样的，这里的*表示的是叉乘，相信读者能够明白}
$$
微观物理量和宏观物理量之间的转换：考虑一导线，横截面积为S，每个粒子电荷量为q，速度为v，单位体积内有n个这样的带电 粒子。请问电流为多少？请问单位长度的电流产生的磁场大小是多少？

磁场对通电导线的作用力：
$$
F=\int _L I dl* B~~\text{*代表叉乘}
$$
**熟知结论：**

1.   无限长直导线的磁力线：$B= \frac{\mu _0}{4\pi}\cdot \frac{2I}{a}$

     >   和无线长直带电直线产生的电场表达式有些类似；或者干脆这个压根不用记，用<a>磁场的安培环路定理</a>简单推导一下几个

2.   圆电流产生的磁场$B= \frac{\mu _0 I}{2}\cdot \frac{R^2}{(R^2+a^2)^{\frac{3}{2}}}$ <a href="#3">Proof</a> 

3.   特别的，圆电流圆形处的磁场$B=\frac{\mu _0 I}{2R}$，也就是上式取a=0；

4.   无限长螺线管的中心$B= \mu _0 nI$;  (如果是处于半无限长螺线管的一端，那么结果为$B=\frac{\mu _0 nI }{2}$)

5.   任意形状的闭合载流线圈在均匀磁场中受力为0（但是力矩不为0）力矩M=m*B  （ * 为叉乘）,m为磁矩m=IS，有方向）

6.   在均匀磁场中，对任一形状的闭合电 流回路，不论是位置改变还是形状改变，磁力或磁力矩作的功都等于电流与磁通增量的乘积。

7.   ![image-20250621100834451](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250621100834451.png)

>   磁矩不考

**磁场计算-毕奥—萨伐尔定律**

例题一：

![image-20250619174034748](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619174034748.png)

例题二： <a id="3"> </a>

![image-20250619174451507](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619174451507.png)

**磁场计算-安培环路定理**

例题三：无限长直圆柱载流导线磁场的分布

>   记得分段

例题四：此题有两个解法，方法一为使用积分方法（只能计算中心轴线的磁场），方法二为使用安培环路定理![image-20250619203409832](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619203409832.png)

例题四：

![image-20250619204027446](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619204027446.png)

例题五：

![image-20250619204049667](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619204049667.png)

例题六：

![image-20250619210024349](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619210024349.png)

叠加叠加！ 

**磁场计算-磁场对载流导线的作用**

![image-20250619213432774](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619213432774.png)

### 电磁感应定律

**知识回顾**

![image-20250619213807615](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619213807615.png)

电动势由洛伦兹力产生，即**洛伦兹力充当非静电力，产生感应电动势**

电动势的另外一种计算方法：

![image-20250619214919509](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619214919509.png)

**动生电动势-积分计算**

![image-20250619215402707](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250619215402707.png)

![image-20250621112614375](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250621112614375.png)

**感生电动势** 

![image-20250621110724715](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250621110724715.png)

>   此题比较坑，因为需要考虑到磁场是**非均匀**的，需要先积分得到t时刻的磁通量



### 数学补充

面微元：$dS= \rho d \rho dr$

球微元：$dV= \rho ^2sin \phi d \rho d\phi d\theta$

woc全空间角是啥🖐️😭🖐️

### 概念题集合

>   本次考试会有概念题

**电场的高斯定理**

通过电场中任一闭合曲面的总电通量，等于该曲面内包围的所有电荷电量的代数和除以 ε 而与闭合面外的电荷无关。

**电场的环路定理**

场强环路定理- 静电场中，沿任一闭合路径 场强的环流等于零。

**电势叠加原理**

电势叠加原理：点电荷电场中一点的电势， 等于每一点电荷单独在这一点所产生的电势 的代数和。

**静电平衡**

在电场中，导体的内部和表面都没有电荷定向移动的状态。

>   特点有：

**安培环路定理**

安培环路定理： 磁感应强度沿任一闭合路径L的线 积分（B的环流）等于穿过这个环 路(穿过以该闭合路径为边界的任意 曲面)的各恒定电流强度的代数和的$\mu _0$倍，电流的方向按右手螺旋。

**法拉第电磁感应定律**

穿过闭合回路所围曲面的磁通量发生变化时， 导体回路中产生的感应电动势正比于磁通量变化率 的负值，即：
$$
\epsilon = -\frac{d\varphi}{dt}
$$

**麦克斯韦方程组**

| 序号 | 名称               | 积分形式公式                                                 | 物理意义                 |
| ---- | ------------------ | ------------------------------------------------------------ | ------------------------ |
| 1    | 高斯定律（电场）   | $\displaystyle \oint_{\partial V} \vec{E} \cdot d\vec{A} = \frac{Q_{\text{in}}}{\varepsilon_0}$ | 电荷产生电场             |
| 2    | 高斯定律（磁场）   | $\displaystyle \oint_{\partial V} \vec{B} \cdot d\vec{A} = 0$ | 磁场无源（无磁单极子）   |
| 3    | 法拉第电磁感应定律 | $\displaystyle \oint_{\partial S} \vec{E} \cdot d\vec{l} = -\frac{d}{dt} \int_S \vec{B} \cdot d\vec{A}$ | 变化的磁场产生电场       |
| 4    | 安培-麦克斯韦定律  | $\displaystyle \oint_{\partial S} \vec{B} \cdot d\vec{l} = \mu_0 I_{\text{in}} + \mu_0 \varepsilon_0 \frac{d}{dt} \int_S \vec{E} \cdot d\vec{A}$ | 电流和变化的电场产生磁场 |

>   本表格由gpt-4o生成

### 证明题集合

>   **本次考试不考证明题！**

为什么会出现尖端放电？

证明：尖端曲率大、电荷密度大、电场强度大

为什么静电平衡的物体表面的带电量和电荷密度成正比？

证明：使用高斯定理，做一个小封闭曲面即可，内部由于导体静电平衡电场为0。

好的，我来为您简要概括这四条性质的证明：

1. **导体内部电场为零：**

    - **证明思路：** 反证法。若导体内部有电场，自由电荷会移动形成电流，与静电平衡（无电流）的定义矛盾。因此电场必为零。

2. **导体是等势体，表面是等势面：**

    - 证明思路：
        - **等势体：** 因内部电场为零 (E=−∇V=0)，所以电势在导体内部处处相等。
        - **等势面：** 若表面有电势差，则存在切向电场分量，会使自由电荷沿表面移动形成电流，与静电平衡矛盾。因此表面电势处处相等。

3. **导体外部场强与表面正交，并正比于表面电荷密度：**

    - 证明思路：
        - **正交：** 若场强不与表面正交，则存在切向分量，会使表面电荷移动形成电流，与静电平衡矛盾。
        - **强度关系：** 利用高斯定理。构建一个穿过导体表面的微小圆柱形高斯面，内部电场为零，侧面无通量。外部底面的电通量 (E⋅dS) 等于高斯面内包含的电荷 (σ⋅dS) 除以 ϵ0，由此导出 E=ϵ0σ。

4. **电荷面密度与导体表面曲率的关系：**

    - 证明思路：

         间接证明，通过连接不同半径的两个导体球来理解。

        - **等势条件：** 达到静电平衡时，两个球体的电势相等 (V1=V2)。
        - **推导关系：** 利用球体电势公式 (V=Q/(4πϵ0R)) 和表面电荷密度定义 (σ=Q/(4πR2)) 进行代换。最终得到 σ1R1=σ2R2，表明电荷密度 σ 与曲率半径 R 成反比，即曲率大的地方（R 小）电荷密度大。

这些证明都基于静电平衡的核心概念：导体内部没有电荷的宏观移动。

>   感谢Gemini

### 模型补充

**球电容器模型**

>   理想的球电容器模型中心是一个带电实心球+一个带电球壳

![image-20250621091502913](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250621091502913.png)

>   试着求一下能量

**圆柱形电容**

![image-20250621093837027](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250621093837027.png)

**平行板电容**

1.   全部充入电介质
2.   插入金属板
3.   多种电介质

## 考试提醒

1. 记得看看最后得到的表达式符合题目的要求，是否使用了没有给出的变量？比如$cos \alpha$ 是自己设的，需要转成L、x、r？
2. 使用高斯公式、安培环路定理时，需**要明确说明使用了这一公式！**
3. 注意求的如果是**向量那么需要有方向！！！**

## 写在最后

期末考试分数暂时没有出来，但是期末考得内容十分地简单，大部分人都在1h内交卷了

*2025-06-24*

*<a href="https://github.com/yama-lei">yama</a>*

