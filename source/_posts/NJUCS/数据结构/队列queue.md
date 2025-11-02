---
categories:
  - NJUCS
  - 数据结构
title: 数据结构：队列
created: 2025-09-28T21:20
updated: 2025-10-15T21:25
---

队列（queue）是一种具有「先进入队列的元素一定先出队列」性质的表。由于该性质，队列通常也被称为先进先出（first in first out）表，简称 FIFO 表。
![queue](https://oi-wiki.org/ds/images/queue.svg)

## 队列的实现
**顺序队列**
使用数组实现，可以实现非循环队列和循环队列两种：
**非循环队列**：
- push_back(data): `arr[rear++] = data`
- pop_front(): `front++`
- is_empty(): `return front == rear`
- is_full(): `return rear == maxsize` (rear指向的是下一次push的位置，当rear == maxsize时，已经溢出)
**循环队列**
- push_back(data):`arr[rear]=data;rear=(rear+1)%n;`
- pop_frint() `front=(front+1)%n;`
- is_empty():`return front==rear`
- is_full():`return (rear+1)%n==front`
>需要注意：
>1. rear是队尾，是插入元素的位置（rear所指的是下一个元素插入的位置）；front是队首，是删除元素的位置
>2. 循环队列为了区分empty和full的条件，只能够在最后一个节点不放置元素。

 **链表队列**
使用链表来实现队列：
> 个人认为队列使用数组来实现更加简单方便，故在此处略去
## 队列的应用

**问题**
逐行打印二项展开式 $(a + b)^i$ 的系数
**解法**
相当于打印一个杨辉三角，可以直接使用一个二维数组进行存储，但是存储开销有点大，一个比较节省空间的方法是：使用队列存储系数。
思路
1. 第一行系数为1
2. 如果第i行已知（有k个数字），在这行前面加上一个0，最后也加上一个0，那么这一行一共有k+2个数字；将第i和第i+1个数字相加得到下一行的第i个数字
3. 使用一个队列来存储当前这一行的数字
![image.png](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20251003143349.png)
不过为什么不直接使用组合数来计算？

## 优先级队列
**priority_queue**优先级队列的元素具有一个优先权，优先权高的元素排在前面，在出队的时候优先把优先权高的先出队，相同优先权则按照入队顺序，遵守FIFO。
实现方法：
在原先的基础上，添加一个`adjust`函数，给队尾元素安排一个位置。
```cpp
while(arr[cur]<last){
	arr[cur+1]=arr[cur];
	cur-=1;
}
arr[cur+1]=last;// put the last item in back of the first element that priorer to it
```



**使用STL中的有限级队列：**
```cpp
priority_queue<int, vector<int>, greater<int>> q1; // 最小堆
priority_queue<int> q2;                           // 最大堆
template<typename T>
struct CMP {
    bool operator()(const T& t1, const T& t2) const {
        // 自定义比较逻辑
        return t1 > t2; // 例如：实现最小堆，需返回 t1 > t2
    }
};

priority_queue<Type, vector<Type>, CMP<Type>> q3;
```

`priority_queue` 默认是最大堆。若需最小堆，可使用 `greater<int>` 作为第三个模板参数。对于自定义类型，需提供一个仿函数（如 `CMP`）来定义元素之间的优先级关系。该仿函数必须重载 `operator()`，并返回 `true` 表示第一个参数应排在第二个之后。
## 双端队列

