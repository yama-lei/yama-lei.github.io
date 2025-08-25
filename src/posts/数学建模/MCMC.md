# Markov Chain Monte Carlo

## Markov Chain

**状态空间 (State Space)：** 系统所有可能处于的状态的集合。

-   例如，天气可以是 {晴天, 阴天, 雨天}。
-   抛硬币结果可以是 {正面, 反面}。

**状态 (State)：** 系统在某一时刻所处的具体情况。

**转移概率 (Transition Probability)：** 从一个状态转移到另一个状态的概率。

-   例如，如果今天是晴天，明天是阴天的概率是 0.3。
-   我们通常用 P(Xt+1=j∣Xt=i) 来表示从状态 i 转移到状态 j 的概率。其中 Xt 表示在时间 t 的状态

我们可以用一个**转移概率矩阵 (Transition Probability Matrix)** 来表示所有状态之间的转移概率。

---

经过足够长的时间，markov chain可能达到一个stationary distribution（即，‘平稳分布’）

如果一个马尔可夫链存在平稳分布 π=(π1,π2,…,πk)，那么意味着：

-   无论你从哪个初始状态开始，经过足够长的时间后，系统处于状态 i 的概率会趋近于 πi。
-   一旦系统达到了平稳分布，它会一直保持在这个分布中。也就是说，如果当前系统状态的概率分布是 π，那么下一个时刻的系统状态概率分布仍然是 π。

用数学表示就是：πP=π，其中 P 是转移概率矩阵。这实际上是一个线性方程组。

>   很好理解，将概率分布乘以概率转移矩阵就是

```py
import numpy as np
from random import random
possibility_transition=np.array(
    [[0.5,0.5],[0.8,0.2]]
)
seed=random()
possibility=np.array([seed,1-seed])
possibility@possibility_transition
for _ in range(20):
    print(possibility)
    possibility@=possibility_transition
```

## Metropolis-Hastings (MH) 

MH算法用于构建一个Markov Chain

---









## 数据建模与机器学习方法

**缺失值的处理**

**数据规范化**

**特征离散化**

**离群值检测**

**综合评价方法**

**评价指标类型的一致性**

-   极大型指标：越大越好
-   极小性指标：通过倒数变化可以转成极大型指标
-   中间型指标：可以将指标$x'= min(abs(x-m),abs(x-M))$
-   区间型指标：追求数据在某一个区间（如果数据在区间内，那么指标为1，否则越靠近区间的端点值越大）



**权重确定方法**

-   指标功能赋权
-   指标差异赋权
-   动态加权

**线性回归**

RSS: 残差平方和

y=w1X+w0,要使得残差平方和最小，需要求偏导，即RSS(w0,w1)对w0和w1求偏导，求出w0和w1

**线性回归的正则化**

LASSO的求解

非线性回归模型

**机器学习**

用机器学习解决二分类问题，引入sigmod函数，将离散的y值映射到0,1之间

Logistic回归：

**K临近**

**决策树**

**朴素贝叶斯**

**支持向量机SVM**

**集成模型**

随机森林（Bagging）

Adboost(Boost)

PCA

**ANN**

多层感知机

模型训练
