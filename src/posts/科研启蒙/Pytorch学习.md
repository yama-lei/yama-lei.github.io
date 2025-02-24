---
title: Pytorch学习
author: yama
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

>   Reading this passage in Zhihu is highly recommended: [深度学习中关于张量的阶、轴和形状的解释 | Pytorch系列（二） - 知乎](https://zhuanlan.zhihu.com/p/131591991)

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

#### **一. 用torch.tensor()方法**

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

#### **二. 使用内置函数创建特殊形状的函数**

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

>   如何理解高维的tensor？以这里的张量a为例，a的shape是(2,3,4),可以理解为2个shape为(3,4)的tensor 组合而成；shape为(3,4)的张量又是3个shape为(4,)的张量构成



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

#### **四. 创建单位矩阵**

使用torch.eye(n)来创建一个n*n维的单位矩阵

```py
eye_tensor = torch.eye(3)
print(eye_tensor)
''' tensor([[1., 0., 0.],
        [0., 1., 0.],
        [0., 0., 1.]])'''
```

#### **五.从已有的张量创建新的张量**

**1. 形状相同：**

使用``torch.ones_like`可创建和参数一样Shape的，全为零的tensor

使用``torch.rand_like`可创建和参数一样Shape的，值全为0~1间随机的数字

类似的还有`zeros_like`和`randn_like`

**2.形状和数值都相同**

深拷贝：`new_tensor=torch.tensor(old_tensor)`

`new_tensor=old_tensor.clone()`

>   从ndarray创建的tensor不是深拷贝，而是相同对象的引用

### tensor的运算

#### 基本数学运算

**一.加减乘除**

两个tensor的加减乘除得到一个新的**同形状**的tensor，新的 tensor上每一个元素都是参与运算的两个tensor对应元素的加减乘除

>   即，**逐元素加减乘除**

```python
tensorA=torch.tensor([2,3,4])
tensorB=torch.tensor([4,6,8])
print('tensorA: ',tensorA)
print('tensorB: ',tensorB)
print('tensorB+tensorA: ',tensorB+tensorA)
print('tensorA-tensorB: ',-tensorB+tensorA)
print('tensorB*tensorA: ',tensorB*tensorA)
print('tensorB/tensorA: ',tensorB/tensorA)
'''
results:
tensorA:  tensor([2, 3, 4])
tensorB:  tensor([4, 6, 8])
tensorB+tensorA:  tensor([ 6,  9, 12])
tensorA-tensorB:  tensor([-2, -3, -4])
tensorB*tensorA:  tensor([ 8, 18, 32])
tensorB/tensorA:  tensor([2., 2., 2.])
'''
```

**二.矩阵运算**

**矩阵乘法**：使用`torch.matmul`或者`@`运算符

```python
a=torch.tensor([[1,2,3],[1,2,3]])
b=torch.tensor([[1,2],[1,2],[1,2]])
print('a @ b : \n',a @ b,'\n')
print('torch.matmul(a,b) :\n',torch.matmul(a,b))
''' a @ b : 
 tensor([[ 6, 12],
        [ 6, 12]]) 

torch.matmul(a,b) :
 tensor([[ 6, 12],
        [ 6, 12]])
'''
```

**矩阵转置**：使用`.t()`方法对二维张量进行转置，使用`.transpose()`方法对任意维度张量进行转置

```python
a=torch.rand(2,3,4)
print(a.transpose(0,1)) #将第0维和第1维进行交换
''' 
tensor([[[0.0687, 0.0416, 0.0968, 0.0315],
         [0.6092, 0.9713, 0.4944, 0.3970]],

        [[0.5626, 0.0456, 0.3268, 0.8884],
         [0.0375, 0.4542, 0.3374, 0.3793]],

        [[0.8587, 0.5564, 0.9749, 0.0923],
         [0.9446, 0.3608, 0.3371, 0.1169]]])
'''
```

交换维度还有其他的办法：`torch.permute()`，接受的参数是从0~n-1的整数的一个序列。对于这个序列的第i项，a ~i~ ,表示把原来的第a~i~维换到了第i维。

比如给定一个三维的张量a=troch.rand(2,3,4)，它的shape为(2,3,4)，如果a.permute(0,2,1)，那么会得到一个shape为(2,4,3)的张量。

>   `permute` 只能重新排列已有的维度，而不能改变张量的形状。

**三. 索引，切片，连接**

先理解什么是多维的张量，张量不同于向量（或者说向量就是一维的张量），张量的维度和向量的维度不是一个概念，张量的维度和编程中的张量维度是一致的。四维张量是多个三维张量组合而成，三维张量不过是多个二维张量组合而成，以此类推。

**1.索引操作**

```python
a=torch.rand(2,3,4)
print(a)
print(a[0])
print(a[0][0])
print(a[0][0][0])
''' 
tensor([[[0.6739, 0.9918, 0.5762, 0.1026],
         [0.4075, 0.6841, 0.9652, 0.4298],
         [0.6714, 0.4911, 0.6309, 0.2346]],

        [[0.5633, 0.0261, 0.7101, 0.6402],
         [0.1149, 0.0642, 0.5243, 0.2973],
         [0.3718, 0.8068, 0.3164, 0.9270]]])
tensor([[0.6739, 0.9918, 0.5762, 0.1026],
        [0.4075, 0.6841, 0.9652, 0.4298],
        [0.6714, 0.4911, 0.6309, 0.2346]])
tensor([0.6739, 0.9918, 0.5762, 0.1026])
tensor(0.6739)
'''
```

这里上面和多维数组的操作没有什么区别，但是张量还可以直接取出第n维的数据：

```python
print(a[:,1]) #等价于a[:,1,:],得到的shape是原先的shape除去第1维(维度的索引从0开始，这里第一维其实是第二维)
print(a[:,:,0])
''' 
tensor([[0.4075, 0.6841, 0.9652, 0.4298],
        [0.1149, 0.0642, 0.5243, 0.2973]])
tensor([[0.6739, 0.4075, 0.6714],
        [0.5633, 0.1149, 0.3718]])
'''
```

如何理解这里的取索引操作呢？这里给出yama的想法：

1.   从第0维开始读，如果这一维度的索引已经**指定了**，那么**取对应的元素**，并接着往下读索引；如果索引**没有给出**（包括`a[:,1]`和`a[1]`,前者省略了第0维和第1维以后的索引，后者省略了第0维以后所有的索引)那么就**全取**
2.   以下面这个例子为例，如果给定了确定的索引，那么取对应的元素（即取对应二维张量）

```py
a=torch.rand(2,3,4)
print(a)
print(a[0])

''' 
# 原先的张量，shape为(2,3,4)
tensor([[[0.6739, 0.9918, 0.5762, 0.1026],
         [0.4075, 0.6841, 0.9652, 0.4298],
         [0.6714, 0.4911, 0.6309, 0.2346]],

        [[0.5633, 0.0261, 0.7101, 0.6402],
         [0.1149, 0.0642, 0.5243, 0.2973],
         [0.3718, 0.8068, 0.3164, 0.9270]]])
# 取出的二维张量，shape为(3,4)
tensor([[0.6739, 0.9918, 0.5762, 0.1026],
        [0.4075, 0.6841, 0.9652, 0.4298],
        [0.6714, 0.4911, 0.6309, 0.2346]])
'''
```

然后接着读，发现`a[0]`只指定了第0维的索引，因此，后面默认都是`全选`



3.   如果第0维没有指定，但是后面维度指定了索引，下面以这个为例：

```python
print(a[:,1]) 
#等价于a[:,1,:],得到的shape是原先的shape除去第1维(维度的索引从0开始，这里第一维其实是第二维)
''' 
tensor([[0.4075, 0.6841, 0.9652, 0.4298],
        [0.1149, 0.0642, 0.5243, 0.2973]])
'''
```

我们可以看到，这里第0维因为没有指定，所以`全选` （指的最后得到的tensor中，拥有这一维度的所有数据，“原来在这个维度有三个子tensor，现在依旧是这样”，或“这根轴上的长度没有变小”[深度学习中关于张量的阶、轴和形状的解释 | Pytorch系列（二） - 知乎](https://zhuanlan.zhihu.com/p/131591991)）

4.   接着递归地读取索引，即可得到最终的张量。

**2. 拼接**

```python
a=torch.tensor([[[1,2],[3,4],[5,6]],[[1,2],[3,4],[5,6]],[[1,2],[3,4],[5,6]]])
print(a.shape)
print(torch.cat((a,a),dim=0).shape)
print(torch.cat((a,a),dim=1).shape)
print(torch.cat((a,a),dim=2).shape)
print(torch.stack((a,a),dim=0).shape)
print(torch.stack((a,a),dim=1).shape)
print(torch.stack((a,a,a),dim=0).shape)#也可以多个拼接
print(torch.cat((a,a,a),dim=0).shape)#也可以多个拼接
```

output:

```
torch.Size([3, 3, 2])
torch.Size([6, 3, 2])
torch.Size([3, 6, 2])
torch.Size([3, 3, 4])
torch.Size([2, 3, 3, 2])
torch.Size([3, 2, 3, 2])
torch.Size([3, 3, 3, 2])
torch.Size([9, 3, 2])
```

`torch.stack`和`torch.cat`的区别在于前者是把当下dim那一维的数据包在一起，形成一个新的维度；后者是把dim这一层的东西全部家在同一层里面。





## 自动求导模块

### 计算图

在**向前传播**的过程中，pytorch会记录每一步的操作，便于在**反向传播**的时候求**梯度**，记录的内容就是**计算图**

### 计算梯度

>   梯度是**损失函数对模型参数的梯度** 

我们在forward过程中会获得一个函数，比如`y=x**x+3*x+5`

我们可以借助`backward`来计算参数

```py
import torch

# 创建一个张量，并设置 requires_grad=True
x = torch.tensor([2.0, 3.0], requires_grad=True)

# 定义一个简单的函数 y = x^2 + 3x + 5
y = x**2 + 3*x + 5

# 计算 y 对 x 的梯度
y.backward(torch.tensor([1.0, 1.0]))  # 传递权重向量

# 查看梯度
print("x 的梯度:", x.grad)

# 禁用梯度计算
with torch.no_grad():
    #在这个子模块中，不会跟踪梯度计算
    z = x**2 + 3*x + 5
    print("z 的值:", z)

# 使用 detach() 方法 得到一个不需要计算梯度的张量
x_detached = x.detach()
print("x_detached 的值:", x_detached)
```

如果y是一个标量，那么无需传递权重参数；如果y是一个n维的tensor（或者说x是一个n维的tensor），那么需要传递一个n维数组，代表权重。

## 数据加载

#### Dataset

>   注意大写**Dataset**

Dataset是一个用于储存和管理数据的一个类。

```python
from torch.utils.data import Dataset,DataLoader
#创建属于自己的Dataset类
class myDataSet(Dataset):
    def __init__(self,data,labels):
        self.data=data
        self.labels=labels
    def __len__(self):
        return len(self.data)
    def __getitem__(self,idx):
        return self.data[idx],self.labels[idx]
data=torch.rand(10,3)
labels=torch.randint(0,2,(10,))
#注意，这里第三个参数是shape
dataset=myDataSet(data,labels)

print('idx\tdata\t\t\t\t\tlabel')
for idx in range(len(dataset)):
    d,label=dataset[idx]
    print(idx,'\t',d,'\t',label)
```

output：

```
idx	data				               	label
0 	 tensor([0.5844, 0.8253, 0.8348]) 	 tensor(0)
1 	 tensor([0.7215, 0.7513, 0.3788]) 	 tensor(0)
2 	 tensor([0.2878, 0.6035, 0.5831]) 	 tensor(0)
3 	 tensor([0.3502, 0.7822, 0.5622]) 	 tensor(1)
4 	 tensor([0.3010, 0.0765, 0.3608]) 	 tensor(0)
5 	 tensor([0.5522, 0.3278, 0.1177]) 	 tensor(1)
6 	 tensor([0.0602, 0.3381, 0.9306]) 	 tensor(0)
7 	 tensor([0.2770, 0.5383, 0.1920]) 	 tensor(0)
8 	 tensor([0.6101, 0.4523, 0.5425]) 	 tensor(1)
9 	 tensor([0.4292, 0.8549, 0.5172]) 	 tensor(0)
```

### DataLoader

DataLoader是加载数据的一个工具，将数据从Dataset中按批次加载，并且支持打乱数据等功能。

**可以使用DataLoader将Dataset打包成一个可迭代对象**

```python
from torch.utils.data import Dataset
from torch.utils.data import DataLoader

class myDataSet(Dataset):
    def __init__(self,data,labels):
        self.data=data
        self.labels=labels
    def __len__(self):
        return len(self.data)
    def __getitem__(self,idx):
        return self.data[idx],self.labels[idx]
data=torch.rand(20,3)
labels=torch.randint(0,2,(20,))
dataset=myDataSet(data,labels)
len(dataset)
dataloader=DataLoader(dataset,batch_size=5,shuffle=True)
for batch_data,batch_size in dataloader:
    print(batch_data)
```

输出：

```
tensor([[0.7829, 0.9668, 0.0646],
        [0.1576, 0.7564, 0.5376],
        [0.3377, 0.2903, 0.0758],
        [0.4523, 0.6460, 0.5544],
        [0.9514, 0.6436, 0.3744]])
tensor([[0.1227, 0.4072, 0.1857],
        [0.1000, 0.0336, 0.3713],
        [0.4613, 0.8199, 0.5381],
        [0.7966, 0.4351, 0.8256],
        [0.1984, 0.0263, 0.4809]])
tensor([[0.2561, 0.1912, 0.4118],
        [0.2537, 0.5558, 0.3612],
        [0.4839, 0.9967, 0.5584],
        [0.8203, 0.9401, 0.9798],
        [0.3146, 0.0245, 0.3652]])
tensor([[0.0591, 0.4059, 0.8901],
        [0.4426, 0.5236, 0.4988],
        [0.7388, 0.3117, 0.9683],
        [0.7014, 0.3335, 0.4483],
        [0.8727, 0.4119, 0.0646]])
```

## 神经网络模块

推荐阅读：[神经网络 — PyTorch Tutorials 2.6.0+cu124 文档 - PyTorch 深度学习库](https://pytorch.ac.cn/tutorials/beginner/blitz/neural_networks_tutorial.html)

### **构建神经网络：torch.nn.Module**

 **torch.nn.Module**是所有神经网络的基类，所有自定义的网络基类都需要继承这个类

`torch.nn`里面有丰富的内容，其中包括多种网络层和损失函数

1.   **线性层**`torch.nn.Linear(in_features=10,out_features=5)`将张量的最后一维（长度为10），映射为长度为5。Linear只会处理最后一维！！！线性变换公式为：*y*=x * W^T^+b其中 *W* 是权重矩阵，*b* 是偏置向量。

1.   **激活函数**：`nn.ReLU`,`nn.Sigmoid`,`nn.tanh`等
2.   **损失函数** ：如`nn.MSELoss()`,`nn.CrossEntropyLoss()`



```py
import torch.nn as nn
import torch.optim as optim
class MyNet(nn.Module):
    def __init__(self):
        super(MyNet,self).__init__()
        self.fc1=nn.Linear(in_features=10,out_features=5)
        self.relu=nn.ReLU
        self.fc2=nn.Linear(in_features=5,out_features=2)
    def forward(self):
        x=self.fc1(x)
        x=self.relu(x)
        x=self.fc2(x)
        return x
net=MyNet()
print(net)
```

定义一个神经网络，需要定义里面的每一层，以及forward的方法。

### 评估神经网络：损失函数

评估模型的好坏，我们需要将神经网络的输出和我们预测的输出进行对比，需要用到损失函数。

常见的损失函数有

1.   MSELoss: 均方损失函数，用于回归
2.   CrossEntropyLoss交叉熵损失，用于分类问题
3.   BCELoss二院交叉熵损失，用于二分类

```python 
criterion=nn.BCELoss()#define the criterion function
predictions=net(rawData)
loss=criterion(predictions,targets)
#compare the predictions and targets 
print(loss.item())
```

在这里，loss是一个张量，我们可以通过`loss.backward()`进行**反向传播**



### **优化神经网络：torch.optim**

`torch.optim` 是 PyTorch 中用于优化模型参数的模块，提供了多种优化算法（如 SGD、Adam 等）。它的主要作用是根据梯度更新模型参数。

在模型训练的过程中，需要不断地进行 清空损失函数的梯度，反向传播，优化参数等步骤

```py
import torch.optim as optim
optimizer=optim.SGD(net.parameters(),lr=0.01)

optimizer.zero_grad()#每一次都要清空梯度，因为每一次loss调用backward时，都会将梯度进行积累
loss.backward()#反向传播计算梯度
optimizer.step()#优化参数
```

>   net.paramters()返回一个迭代器，每一个都是网络层的权重和配置等；
>
>   lr，learning rate学习率

## 保存和加载模型

推荐阅读：[PyTorch | 保存和加载模型 - 知乎](https://zhuanlan.zhihu.com/p/82038049#:~:text=原题 | SAVING AND LOADING MODELS作者 | Matthew)

[Saving and Loading Models — PyTorch Tutorials 2.6.0+cu124 documentation](https://pytorch.org/tutorials/beginner/saving_loading_models.html)

### Save and load the state_dict

#### ** 什么是状态字典(state_dict)**

PyTorch 中，一个模型(`torch.nn.Module`)的可学习参数(也就是权重和偏置值)是包含在模型参数(`model.parameters()`)中的，一个状态字典就是一个简单的 Python 的字典，其键值对是每个网络层和其对应的参数张量。模型的状态字典只包含带有可学习参数的网络层（比如卷积层、全连接层等）和注册的缓存（`batchnorm`的 `running_mean`）。优化器对象(`torch.optim`)同样也是有一个状态字典，包含的优化器状态的信息以及使用的超参数。

>   Adapted from Zhihu

#### **加载/保存状态字典**

保存的代码：

```text
torch.save(model.state_dict(), PATH)
```

加载的代码：

```text
model = TheModelClass(*args, **kwargs)
model.load_state_dict(torch.load(PATH))
model.eval()
```

当需要为预测保存一个模型的时候，只需要保存训练模型的可学习参数即可。采用 `torch.save()` 来保存模型的状态字典的做法可以更方便加载模型，这也是推荐这种做法的原因。

通常会用 `.pt` 或者 `.pth` 后缀来保存模型。

记住

1.  在进行预测之前，必须调用 `model.eval()` 方法来将 `dropout` 和 `batch normalization` 层设置为验证模型。否则，只会生成前后不一致的预测结果。
2.  `load_state_dict()` 方法必须传入一个字典对象，而不是对象的保存路径，也就是说必须先反序列化字典对象，然后再调用该方法，也是例子中先采用 `torch.load()` ，而不是直接 `model.load_state_dict(PATH)`



## 项目实战：判断一个点在第几个象限（多分类）

```py
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
class SorterNet(nn.Module):
    def __init__(self):
        super(SorterNet,self).__init__()
        self.fc1=nn.Linear(2,128)
        self.fc2=nn.Linear(128,128)
        self.fc3=nn.Linear(128,4)# 最终映射得到四个数字，代表四个象限
        self.relu=nn.ReLU()
    def forward(self,x):
        x=self.fc1(x)
        x=self.relu(x)
        x=self.fc2(x)
        x=self.relu(x)
        x=self.fc3(x)
        return x
sorter=SorterNet()

optimizer=optim.Adam(sorter.parameters(),lr=0.01)
criterion=nn.CrossEntropyLoss()
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.1)  # Reduce LR every 10 epochs by a factor of 0.1

from torch.utils.data import Dataset,DataLoader

class myDataset(Dataset):
    def __init__(self,size=1000):
        self.data=[]
        self.label=[]
        self.size=size
        for _ in range(self.size):
            tempArray=np.random.random_sample((2,))*1000-500
            self.data.append(tempArray)
            if(tempArray[0]>0 and tempArray[1]>0):
                self.label.append(0)
            elif(tempArray[0]<0 and tempArray[1]>0):
                self.label.append(1)
            elif(tempArray[0]<0 and tempArray[1]<0):
                self.label.append(2)
            else:
                self.label.append(3)
        self.label=torch.tensor(self.label,dtype=torch.long)
        self.data=torch.tensor(self.data,dtype=torch.float32)
    def __len__(self):
        return self.size
    def __getitem__(self,idx):
        return self.data[idx],self.label[idx] #return both the data and the expected result(label)
dataset=myDataset(500)

dataloader=DataLoader(dataset,batch_size=128,shuffle=True)

for epoch in range(100):
    loss_sum=0
    for inputs,labels in dataloader:
        results=sorter(inputs)
        loss=criterion(results,labels)
        optimizer.zero_grad()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(sorter.parameters(), max_norm=1.0)  # Clip gradients to avoid exploding gradients
        optimizer.step()
        scheduler.step()
        loss_sum+=loss.item()
    if epoch%100==99:
        print(f"Epoch[{epoch}/1000] loss: {loss_sum}")

```

测试代码：

```py
import numpy as np
import torch

def test_model(model, x, y, label):
    # Convert (x, y) into a tensor and reshape it for the model input
    input_tensor = torch.tensor([x, y], dtype=torch.float32).unsqueeze(0)  # Shape (1, 2)
    
    # Pass input through the model
    output = model(input_tensor)
    
    # Get predicted class (index with highest probability)
    _, predicted_class = torch.max(output, 1)
    
    # If prediction matches the true label, return the updated count
    if (x >= 0 and y >= 0 and label == predicted_class.item()) or \
       (x < 0 and y > 0 and label == predicted_class.item()) or \
       (x < 0 and y < 0 and label == predicted_class.item()) or \
       (x > 0 and y < 0 and label == predicted_class.item()):
        return 1  # Correct prediction
    else:
        return 0  # Incorrect prediction

def test_function(model, test_num=1000):
    test_input = [[np.random.random_sample(), np.random.random_sample()] for _ in range(test_num)]
    test_label = []
    for x, y in test_input:
        if x >= 0 and y >= 0:
            test_label.append(0)
        elif x < 0 and y > 0:
            test_label.append(1)
        elif x < 0 and y < 0:
            test_label.append(2)
        else:
            test_label.append(3)

    correct_count = 0
    test_count = 0
    for idx, (x, y) in enumerate(test_input):
        correct_count += test_model(model, x, y, test_label[idx])  # Count correct predictions
        test_count += 1  # Total tests

    correct_rate = correct_count / test_count  # Calculate accuracy
    return test_count, correct_count, correct_rate

# Test the function
test_count_sum = 0
test_correct_sum = 0
for _ in range(10):
    test_count, correct_count, correct_rate = test_function(sorter)
    test_count_sum += test_count
    test_correct_sum += correct_count

# Calculate overall accuracy
rate = test_correct_sum / test_count_sum
print(f"Overall Accuracy: {rate:.4f}")
```

交互版本：

```py
def predict_quadrant(model):
    # 获取用户输入的坐标
    x = float(input("请输入x坐标: "))
    y = float(input("请输入y坐标: "))
    
    # 将输入的坐标转换为 tensor
    input_tensor = torch.tensor([x, y], dtype=torch.float32).unsqueeze(0)  # Shape (1, 2)
    
    # 使用模型进行预测
    output = model(input_tensor)
    
    # 获取预测的类别
    _, predicted_class = torch.max(output, 1)
    
    # 显示预测结果
    if predicted_class.item() == 0:
        print(f"坐标 ({x}, {y}) 位于第一象限 (x>0, y>0)")
    elif predicted_class.item() == 1:
        print(f"坐标 ({x}, {y}) 位于第二象限 (x<0, y>0)")
    elif predicted_class.item() == 2:
        print(f"坐标 ({x}, {y}) 位于第三象限 (x<0, y<0)")
    else:
        print(f"坐标 ({x}, {y}) 位于第四象限 (x>0, y<0)")

# 使用示例
while True:
    predict_quadrant(sorter)  # 输入并预测某个坐标
```

