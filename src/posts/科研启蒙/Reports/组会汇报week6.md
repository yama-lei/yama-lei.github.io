---
date: 2025-04-26
title: 例会汇报 | 第六次
---

上一次在[[1704.03162\] Show, Ask, Attend, and Answer: A Strong Baseline For Visual Question Answering](https://arxiv.org/abs/1704.03162)

这篇论文中，**Stacked Attention**的具体实现不是很懂，这篇论文给出了更加详细地实现[1511.02274](https://arxiv.org/pdf/1511.02274)

**Reference**

[【论文笔记】Stacked Attention Networks for Image Question Answering | Blog of YQ](https://junzx.github.io/2019/11/22/paper-QAnswering/)

[show ask attend and answer](https://chatgpt.com/s/dr_681cbe52e6048191b18bbed8a36370cc)

---

## 什么是Stacked Attention?

**Stacked Attention Network（SAN）** 是一种**多步推理的注意力机制**，它在回答问题时，不是一次性决定关注图像的哪个区域，而是**分多步迭代地逐步缩小注意区域**，从而提升推理能力。

-   在每一步，网络都会根据问题与当前图像表示**生成一个注意力分布**（相当于给图像的每一块都加上了注意力权重）
-   然后使用这个注意力加权图像区域，**更新问题表示**（称为 refined query vector） 
-   将这个 refined 表示继续作为下一轮 attention 的 query，形成“堆叠”的结构

![image-20250510191315747](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250510191315747.png)

## SANs的构成

The SAN consists of three major components:

 (1)图像建模:	` the image model,` which uses 1a CNN to extract high level image representations, e.g. one vector for each region of the image; 

(2) 问题建模:	`the question model`, which uses a CNN or a LSTM to extract a semantic vector of the question and .

(3) 堆叠注意力:	`the stacked attention model`, which locates, via multi-step reasoning, the image regions that are relevant to the question for answer prediction. 

The following image illustrates how do these components work together.

![image-20250509182945001](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250509182945001.png)



## Image Model

1.   对图像的处理：使用CNN来处理图像，并且取池化层`pooling`的最后一层（因为具有图像内容的高级特征）

     >   | CNN 层级               | 特征层次 | 表达能力                 |
     >   | ---------------------- | -------- | ------------------------ |
     >   | 前几层（Conv1、Conv2） | 低级特征 | 边缘、颜色、纹理等       |
     >   | 中间层（Conv3、Conv4） | 中级特征 | 局部结构、轮廓           |
     >   | 后几层（Conv5、FC）    | 高级特征 | 对象类别、语义、区域含义 |

     

2.   具体过程：

     1.   将图像变形为448*448px

     2.   经过CNN处理，提取出一个512* 14* 14的向量（即，图像被一个向量表示了出来，这个图像被划分成了14*14个区域，每一个区域有512维的特征,在论文中，这个向量用$f_I$来表示，$f_I$的第i列用$f_i$ 来表示，$i\in [0,14^2-1]$ ）

     3.   与question向量进行对齐。 通过一层`single layer preception单层感知机`（即全连接层加上激活函数） 
          $$
          v_I = tanh(W_If_I +b_I)
          $$
          这里的$v_I$就是我们处理过后，对齐的图像特征

          >   因为图像特征和文本特征的融合需要进行融合;
          >
          >   $W_I$是d*512的一个矩阵，将f_i (512维) 映射成为d维。



## Question Model

>   这里我对于问题特征的提取不是特别了解

### `LSTM` based question model

将问题作为一个词序列输入

用 LSTM（长短期记忆网络）对每个词编码，最终使用最后一个隐藏状态作为问题向量 $v_Q$

![image-20250511092514446](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250511092514446.png)

### `CNN` based question model

将问题作为一个词向量序列（如 GloVe）输入

使用一维卷积提取局部 n-gram 特征，然后 max pooling 得到全局语义表示

更适合短句或问题结构比较固定的情况

![image-20250511092535914](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250511092535914.png)

## Stacked Attendtion Network

前面我们已经得到了图像特征($v_I$)和文本特征($v_Q$)的表示，并且已经将他们统一到了同一维度(维度均为d). 

>   注意$v_I$和$v_Q$的形状不一样，

下面是如何通过多次注意力机制来实现`stacked attendtion` 

1.   将图像特征和文本特征进行融合
2.   得到每一个区域的权重分布（反应了图像和问题的相关程度）

$$
\begin{align} h^A &= \tanh(W_I^A v_I + (W_Q^A v_Q + b_A)) \tag{15} \\ p^I &= \text{softmax}(W_P h^A + b_P) \tag{16} \end{align}
$$

>   这些公式里面的W都代表是参数矩阵，b都代表是参数向量；上面表了一个A代表是Attendtion，I代表Image，Q代表Question

更详细地：

$h^A$是将原本的$v_I$和$v_Q$的特征向量都映射成了k维（即$v_I$原本是d*m维的，m是图像的patch数，d是每一个patch的特征维数，但是在这个公式中左乘了一个 k * d维的向量，将其映射成了k * m维的向量。vQ同理，原本是m维向量，变成了k维向量）

得到的$h^A$ （一个k* m 维向量）再左乘一个1*k维的参数矩阵变成1 *m维，之后进入一层softmax，得到最后一个权重向量，$P_I$ 。

$P_I\in R^m$,长得类似(0.1, 0.2,0.7),代表了每一个patch的注意力权重。 

我们用这个权重对原先的Image vector进行加权，得到：
$$
v_I^`= v_IP^I
$$
(想想一下，$v_I$是一个d*m维的向量，$P^I$是一个m *1 的向量,相乘得到一个d * 1的向量)

新的图像特征和和文本特征相加得到一个`refined query vector`。可以理解为是更加精准的融合特征表示
$$
u= v_I^`+ v_Q
$$
此时我们已经完成了一次注意力，实际上上述过程可以进行重复操作。

使用这个注意力加权图像区域u，**更新问题表示**（称为 refined query vector）

将这个 refined 表示继续作为下一轮 attention 的 query，形成“堆叠”的结构

即： 将u替代最初的v_Q进行迭代，多次迭代实现堆叠注意力。



![image-20250510191315747](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250510191315747.png)

---

>   query vector 好像是一个attention机制里面的专有名词， 我没有弄明白，故在这里不解释.下面是ai的解释
>
>   ### 什么是 Query Vector？
>
>   在注意力机制中：
>
>   -   **Query vector** 是“发起注意力请求的向量”
>   -   在 VQA 中，问题的向量 $v_Q$ 就是一个 query，它“在问图像：你哪里能回答我？”

![image-20250510184754070](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250510184754070.png)

最后一步就是拿着得到的query vector生成答案概率：
$$
p_{ans} =softmax(W_uu^K + b_u)
$$
