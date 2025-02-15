---
title: Pytorch学习
---



>   声明： 本文含有从各类教程中获取的内容和ai辅助生成内容

在正式学习之前，先介绍两个很好用的函数:dir()和help()。

一个包好比一个工具箱，工具箱下可能有其他的格子，各自下可能有工具，也可能还有格子。

-   dir 用于看子模块的结构
-   help用于看某个东西的作用

比如

```py
import torch
print(dir(torch)
//得到很多个东西，其中有cuda
 print(dir(torch.cuda))
 //得到很多歌东西，其中有is_available
  print(help(torch.cuda.is_avaiable))
  //得到有关这个的作用
```

## 张量：tensor

张量其实可以视为一种多维数组，用于存储和操纵多维数组。

-   维度（Dimensionality） 一个标量是0维度、的张量，一个一维数组是一个一维的张量。
-   形状（Shape）张量的形状指的是在每个维度的大小，一个3X4的张量意味着它有三行四列。
-   数据类型（Dtype）有torch.int8,torch.int32,torch.float32等等

### tensor的属性

**前四个和数据相关**

1.   data： 被封装的tensor
2.   dtype： 张量的数据类型
3.   shape： 张量的形状
4.   device : 获取张量所在设备，GPU/CPU

**下面四个和梯度求导息息相关**

5.   requires_grad: 是否需要计算梯度
6.   grad: 梯度
7.   grad_fn: 创建tensor的函数，是自动求导的关键所在
8.   is_leaf: 指示张量是否为叶子结点

### tensor张量的创建

**一. 用torch.tensor()方法**

将Python原生的列表或者numpy的Array对象作为参数，可以创建张量：

```py
import numpy as np
import torch
tensorA=torch.tensor([1,2,3,4])
#tensorA是一个一维张量
tensorB=torch.tensor(np.zeros([2,3]))
#tensorB是一个二维张量
tensorC=torch.tensor(np.Array([1,2,3]))
#tensorC是一个一维张量
```

**二. 使用内置函数创建特殊形状的函数**

你可以使用一些内置函数来创建特定形状的张量。

-   **`torch.zeros()`** : 创建全为 0 的张量。
-   **`torch.ones()`** : 创建全为 1 的张量。
-   **`torch.empty()`** : 创建未初始化的张量（内容是随机的）。
-   **`torch.rand()`** : 创建元素值在 [0, 1) 范围内的随机张量。
-   **`torch.randn()`** : 创建服从标准`标准正态分布`的随机张量。

>   这些函数的参数都是多个整数，代表形状

```py
a=torch.zeros(2,3,4)
print('a: ',a)
b=torch.ones(2,2)
print('b: ',b)
c=torch.rand(4,1)
print('c: ',c)
d=torch.randn(3,2)
print('d: ',d)
```

运行结果

```py
a:  tensor([[[0., 0., 0., 0.],
         [0., 0., 0., 0.],
         [0., 0., 0., 0.]],

        [[0., 0., 0., 0.],
         [0., 0., 0., 0.],
         [0., 0., 0., 0.]]])
b:  tensor([[1., 1.],
        [1., 1.]])
c:  tensor([[0.4796],
        [0.9827],
        [0.9631],
        [0.6458]])
d:  tensor([[-1.8295, -0.7194],
        [ 0.5028,  0.3128],
        [-1.5890,  0.1775]])
```

**三. 创建等差数列**

你可以使用 `torch.arange()` 或 `torch.linspace()` 来创建等差数列的张量。

-   **`torch.arange(start, end, step)`** : 创建从 `start` 到 `end`（不包括 `end`），步长为 `step` 的张量。
-   **`torch.linspace(start, end, steps)`** : 创建从 `start` 到 `end`（包括 `end`），分为 `steps` 个点的张量。

```python
print(torch.arange(2,3,0.1))
print(torch.linspace(3,4,10))
'''
tensor([2.0000, 2.1000, 2.2000, 2.3000, 2.4000, 2.5000, 2.6000, 2.7000, 2.8000,
        2.9000])
tensor([3.0000, 3.1111, 3.2222, 3.3333, 3.4444, 3.5556, 3.6667, 3.7778, 3.8889,
        4.0000])
```

**注意torch.linspace的第三个参数是’份数‘，而torch.arange的第三个参数是步长**

**四. 创建单位矩阵**

使用torch.eye(n)来创建一个n*n维的单位矩阵

```py
eye_tensor = torch.eye(3)
print(eye_tensor)
''' tensor([[1., 0., 0.],
        [0., 1., 0.],
        [0., 0., 1.]])'''
```

