---
categories:
  - NJUCS
  - 数据结构
title: 队列
---

队列（queue）是一种具有「先进入队列的元素一定先出队列」性质的表。由于该性质，队列通常也被称为先进先出（first in first out）表，简称 FIFO 表。
![queue](https://oi-wiki.org/ds/images/queue.svg)

## 顺序队列
使用数组实现，可以实现非循环队列和循环队列两种：
**非循环队列**：
- push_back(data): `arr[rear++] = data`
- pop_front(): `front++`
- is_empty(): `return front == rear`
- is_full(): `return rear == maxsize` (rear指向的是下一次push的位置，当rear == maxsize时，已经溢出)
## 链表队列


## 杨辉三角



## 优先级队列

## 双端队列

