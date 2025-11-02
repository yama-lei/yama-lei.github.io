---
author: yama
title: 例会汇报 | 第八次
categories:
  - 科研启蒙
  - Reports
date: 2025-06-23 00:00:00
created: 2025-09-28T21:20
updated: 2025-09-28T21:38
---

<div style="
  padding: 8px 15px;
  border-left: 5px solid #e91e63;
  display: inline-block;
">
  省流版:这两天我又双叒叕想复现一个模型，又双叒叕失败了；但是也积累了一些<del>经验</del>教训
</div>

因为环境迁移很麻烦，然后就想着要实现一个

实验室环境：

python3.6.8（2018年），对应支持的包版本也就比较旧，比如numpy只支持到1.19.5；

centOS7，也是很老了

我们没有管理员权限

---

**尝试远程开发**

这样就不用使用ftp传文件了，也不用切来切去了

[LinuxPrereqs]: 远程主机可能不符合 glibc 和 libstdc++ VS Code 服务器的先决条件 (远程主机不满足运行VS Code服务器的先决条件)

>   glibc 和 libstdc++版本太老了！！更新不了

---

<div style="
  padding: 8px 15px;
  border-left: 5px solid #e91e63;
  display: inline-block;
">
  下一步的计划
</div>

我计划下一步先实现一个最小的，能够有效的跑起来的模型，成功之后再慢慢提升复杂度😂

参考的三个模型的代码和结构：

**层次化注意力**

[Hierarchical Question-Image Co-Attention for Visual Question Answering](https://proceedings.neurips.cc/paper_files/paper/2016/file/9dcb88e0137649590b755372b040afad-Paper.pdf)

pytorch复现代码仓库https://github.com/karunraju/VQA/tree/master

>   注：原代码是用lua写的，这个是第三方复现代码；
>
>   在注意力融合阶段做的比较复杂，说实话不是很明白

---

**VQA: Visual Question Answering**

[VQA: Visual Question Answering](https://arxiv.org/pdf/1505.00468)

复现代码https://github.com/tbmoon/basic_vqa，结构：

![model](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/basic_model.png)

** **

**Simple Baseline for Visual Question Answering**

[Simple Baseline for Visual Question Answering](https://arxiv.org/pdf/1512.02167)

结构如图，代码仓库：[zhoubolei/VQAbaseline: Simple Baseline for Visual Question Answering](https://github.com/zhoubolei/VQAbaseline)

<img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250624232422917.png" alt="image-20250624232422917"  />

---

