---
title: 例会汇报 | 第五次
date: 2023-04-23
---

---

## 一个成功在服务器上跑起来的模型

很久以前，组会分享中介绍过一个VQA的baseline模型[arxiv-1512.02167](https://arxiv.org/pdf/1512.02167)。

因为其结构简单，数据集仅使用了COCO数据集

![Refer to caption](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/x1.png)

但是原先项目是用 lua写的，我想试试pytorch改写。

于是~~我在ai的帮助下~~**ai在我的帮助下**，尝试构造了这个模型：



过程：

-   本地构建模型（本地可以也用一个venv环境，然后再导出一个requiremnets.txt文件即可）
-   服务器创建环境并运行模型
-   将保存好的模型下载到本地
-   成功运行



**在部署中遇见的困难和踩到的坑**

1.   数据大，传输速度慢

2.   环境搭建

3.   数据集出问题

4.   下载

5.   给ai坑了。。。

     训练了一个小时，发现正确率依旧是33%上下，我觉得很纳闷，回去看模型发现：

     ![1745410249937](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/1745410249937.png)

![image-20250423201121073](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250423201121073.png)

---

使用真实数据之后，最后成功开始训练，20个Epoch，batchsize为320，GPU利用率平均75%；

![image-20250423202924246](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250423202924246.png)

每一个epoch大概用时3min，一共训练了20个epoch，准确率提升到了92%,总用时57min

![image-20250423213926209](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250423213926209.png)

![Figure_1](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250423213913139.png)

![](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/Figure_1.png)





但是当我把训练好的模型拿到本地进行测试时，发现了很尴尬的一幕：

<div style="display: flex; gap: 20px;">
  <div style="text-align: left;">
    <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20250423215715.png"  />
  </div>
  <div style="text-align: left;">
    <img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20250423215741.png" />
  </div>
</div>

所有的问题，都会回答`the`。

检查发现，**论文里面说的是COCO VQA数据集，我虽然使用的是COCO2017图像，但是使用的标注集都是caption**，用于训练图像描述的；

<center><del>但凡我和ai有一个会深度学习，也不会出现这么尴尬的事情</del></center>

---

之后还尝试了在COCO2017基础上的一些数据集，但是模型还是不太靠谱，最后效果十分地差。

~~这个悲伤的故事告诉我们，学习要按部就班，一步一个脚印，踏踏实实地学习，夯实基础。~~

......



---

但是我还是不死心，在4/25再试了一次：

-   下载了COCO2014数据集和VQA-v2对这个数据集的标注
-   仍然使用预训练好的CNN模型来提取图像特征，使用LSTM对问题进行编码，使用简单的拼接来特征融合

![image-20250425224401342](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250425224401342.png)

训练了30个epoch，每一个epoch耗时约20min，batchsize设置为64。

早上起来之后发现还没训练完，一看acc和loss，觉得没有训练的必要了

![image-20250426084020076](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250426084020076.png)



![image-20250426085312953](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250426085312953.png)

没错，我又浪费了国家的电。

---



我还是不服气，最后找了一个论文的复现：





---



## VQA早期论文阅读

[1704.03162](https://arxiv.org/pdf/1704.03162)

![image-20250426205954215](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250426205954215.png)

---

模型结构

```py
class Net(nn.Module):
    """
    重新实现论文 ``Show, Ask, Attend, and Answer: A Strong Baseline For Visual Question Answering'' [0]

    这个类定义了一个用于视觉问答（VQA）的神经网络。
    它处理视觉特征（图像）和文本特征（问题）以预测答案。

    [0]: https://arxiv.org/abs/1704.03162
    """
    def forward(self, v, q, q_len):
        """
        网络的前向传播。
        参数:
            v (torch.Tensor): 视觉特征（图像嵌入），形状：(batch_size, vision_features, height, width)
            q (torch.Tensor): 问题嵌入，形状：(batch_size, max_question_length)
            q_len (torch.Tensor): 每个问题的实际长度，形状：(batch_size)
        返回:
            torch.Tensor: 预测答案的 logits，形状：(batch_size, num_answers)
        """
        # 通过 LSTM 处理问题，得到问题特征
        q = self.text(q, list(q_len.data)) 
        # 对视觉特征进行 L2 归一化
        v = v / (v.norm(p=2, dim=1, keepdim=True).expand_as(v) + 1e-8)

        # 基于问题特征计算视觉特征的注意力权重
        a = self.attention(v, q) 
        # 应用注意力机制到视觉特征上，得到加权后的视觉特征
        v = apply_attention(v, a)  
        # 将加权后的视觉特征和问题特征拼接在一起
        
        combined = torch.cat([v, q], dim=1)
        vision_features + question_features)

        # 将组合后的特征传递给分类器，预测答案
        answer = self.classifier(combined)  
        return answer 
```





### **图像特征提取**

- 采用152层深度残差网络（ResNet-152）作为图像编码器，基于ImageNet预训练权重进行特征提取。  

---

### **问题特征提取**
- 使用单向长短期记忆网络（LSTM）对问题进行编码。 

---

### **特征融合与注意力机制**

这一部分我没看懂，这是ai生成的内容:

- **多模态交互**：通过堆叠注意力机制（Stacked Attention）实现图像与问题的协同推理。  
  - **注意力权重计算**：  
    1. **特征拼接**：将问题向量$\mathbf{s}$沿空间维度复制为$14 \times 14 \times 1024$，与图像特征$\phi \in \mathbb{R}^{14 \times 14 \times 2048}$拼接，形成联合特征$\psi \in \mathbb{R}^{14 \times 14 \times 3072}$。  
    2. **卷积映射**：通过两层卷积操作生成注意力分布：  
       - 第一层：$1 \times 1$卷积，输出通道数512，激活函数为ReLU。  
       - 第二层：$1 \times 1$卷积，输出通道数$C=2$，对应两个独立的注意力头。  
    3. **归一化**：对每个注意力头$c$在空间维度上应用Softmax，得到归一化权重$\alpha_{c,l} \propto \exp(F_c(\psi_l))$，满足$\sum_{l=1}^{14 \times 14} \alpha_{c,l} = 1$。  
  - **特征聚合**：每个注意力头$c$生成的特征向量为：  
    $$\mathbf{x}_c = \sum_{l=1}^{14 \times 14} \alpha_{c,l} \phi_l \in \mathbb{R}^{2048}$$  
    最终拼接两个注意力头的结果$\mathbf{x} = [\mathbf{x}_1, \mathbf{x}_2] \in \mathbb{R}^{4096}$。

---

### **分类器与输出生成**
将注意力特征$\mathbf{x}$与问题向量$\mathbf{s}$拼接，输入分类器。  

**网络结构**：  

1. **全连接层**：维度降至1024，激活函数为ReLU，应用Dropout（概率0.5）。  
2. **输出层**：线性映射至答案空间$\mathbb{R}^{3000}$，覆盖训练集中最高频的3000个答案（覆盖率92%）。  

**概率生成**：通过Softmax函数计算答案概率分布：  
$$P(a_i | I, q) = \frac{\exp(G_i(\mathbf{h}))}{\sum_{j=1}^{3000} \exp(G_j(\mathbf{h}))}$$  

---

复现的仓库：[Cyanogenoid/pytorch-vqa: Strong baseline for visual question answering](https://github.com/Cyanogenoid/pytorch-vqa)

1.   提取图像特征
2.   从答案中得到词汇表
3.   开始训练
