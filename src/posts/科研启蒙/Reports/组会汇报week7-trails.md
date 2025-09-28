---
date: 2025-05-24
title: 例会汇报 | 第六次
---

两周之前，我分享了近期读的论文[1511.02274](https://arxiv.org/pdf/1511.02274) Stacked Attendtion of Image Question Answering. 论文讲的是SAN（堆叠注意力）的应用。

最近（其实就是昨天😂）我尝试在服务器上复现这个模型：

## **First Attempt：**

不慎找了个19年的tensotflow的实现，但是

```
Python 3.6–3.9
若要支持 Python 3.9，需要使用 TensorFlow 2.5 或更高版本。
若要支持 Python 3.8，需要使用 TensorFlow 2.2 或更高版本。
本地用的python3.12，pip下载不了tensorflow
需要先安装python旧版本再创建`venv`环境，
而且windosw和liunx的venv又不是互通的，需要先导出requirements.txt再到服务器上重新配置
......
用conda的话实验室没有配置，而且我也不熟😂
```

---

花了几个小时之后，我放弃了这个决定

---

## 几个小发现

### 南大的gitlab服务

在想办法配置环境，迁移数据的时候，我无意间发现了南大的git服务，没错是nju.edu.cn！这意味着

**✅终于能够解决很多的数据迁移问题了！**

网址：[南大GitLab服务](https://git.nju.edu.cn/) ！！！

但是界面和github有些区别，需要时间适应，但是起码服务器上可以用了！

![image-20250524223725938](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250524223725938.png)

比直接用ftp(适合大文件）传递的速度要快一些，目测大于10MB/s 

>   而且到时候团队协作写代码肯定也是需要用到git🤓☝️直接用南大的git服务能直接解决很多麻烦

但是如果在服务器上想要提交代码，需要先登录账号：

![image-20250525090402915](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250525090402915.png)

---





---

### 使用jupyter+ssh隧道穿透

>   省流版本：在服务器安装好jupyter之后使用ssh隧道和自己的电脑建立联系，十分方便地进行跑代码、改代码，再也不用用vim或者在本地改完又提交了

在尝试运行上述项目的过程中，我配置了jupyter环境来运行ipynb文件，

ssh隧道穿透解决链接问题：

![image-20250524224956589](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250524224956589.png)

老师还提供两个访问liunx服务器的方法：

1.   使用VNC用本地电脑操纵远程电脑，可以使用gedit进行编辑等等。只要不在桌面管理器里面logout就能一直访问
2.   putty or mabaxterm





---

### 训练过程

1.   配置环境

     

2.   准备数据，之前已经在`project/vqa/resources`目录下放置了vqa v2和vqa v1数据集

​	

1.   准备pretrained-model

     先在外网下号预训练模型，之后将模型移动到/home/vqa/.cache/torch/hub/checkpoints 目录下，可以使用cp命令

     `cp *.pth /home/vqa/.cache/torch/hub/checkpoints/vgg19-dcbb9e9d.pth`

### Reflection and Takeaways

1.   寻找复现代码的时候需要考量：
     1.   代码复现使用的框架、语言
     2.   环境配置难度
     3.   项目的复杂程度
2.   使用gitlab服务能够高效地实现在校园网环境下的团队协作、版本管理、代码更改与与提交
3.   使用pip下载包的时候如果在build wheel卡住，可能是缺少相应的编译环境，如：

>    前面我遇见的问题：“代码用了`import cv2`,需要先`pip install opencv`，但是卡住很久没有反应，查询发现缺少cmake环境，于是直接下载预编译好的二进制文件，在末尾加入`-prefer-binary` 参数”

---







---

路线一：VliT、BliP等融合+下游任务处理

路线二：传统的vqa方法训练一个简单的模型

我要负责做传统的vqa方法，比如NIPS-2016-hierarchical-question-image-co-attention-for-visual-question-answering-Paper.pdf、SANs等几年前的模型

---

