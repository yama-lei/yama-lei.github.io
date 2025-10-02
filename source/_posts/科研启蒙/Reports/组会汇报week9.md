---
author: yama
title: 例会汇报 | 第九次
categories:
  - 科研启蒙
  - Reports
date: 2025-06-23 00:00:00
---

## 数据集

### The composition of dataset

-   Images
-   Annotations
-   Questions

### How to use dataset?

以vqa-v1数据集和vqa-v2数据集为例

## 词表

------

你理解得非常准确！简单来说，你概括得很好。

是的，这段代码的核心目的就是构建一个**“语言到数字的翻译”系统**。

-   **`word2idx`：** 没错，它是在构建将**问题中的每个词语“翻译”成唯一数字 ID 的字典**。当用户输入一个问题时，比如“图片里有什么？”，这段代码首先将问题分词为 `['图片', '里', '有', '什么']`，然后利用 `word2idx` 把它们逐个转换成对应的数字序列，例如 `[10, 25, 8, 30]`。这个数字序列才是模型能够理解和处理的输入。
-   **`answer2idx`：** 这部分你的理解稍微有点偏差，但只是一点点。`answer2idx` 实际上是**将最常见的“答案文本”也翻译成唯一的数字 ID**（例如，把“Yes”翻译成 `0`，把“No”翻译成 `1`，把“Red”翻译成 `2` 等）。
    -   **在训练阶段**：模型会学习如何将图片和问题（都已经数字化了）映射到对应的答案数字 ID。
    -   **在预测阶段**：模型会根据输入的图片和问题，**输出一个数字**（比如 `0`）。然后，我们会需要一个**逆向的翻译表**（通常称为 `idx2answer`，它是 `answer2idx` 的反向映射，通过 `idx2answer = {v: k for k, v in answer2idx.items()}` 就能得到），用它把模型输出的这个数字 `0` 再“翻译”回人类能理解的答案文本，也就是“Yes”。

所以，整个流程可以概括为：

1.  **用户输入问题 (文本) → `tokenize` + `word2idx` → 问题数字序列 (模型输入)**
2.  **模型处理图片特征和问题数字序列 → 模型输出一个答案数字 ID**
3.  **模型输出的答案数字 ID → `idx2answer` (根据 `answer2idx` 反向构建) → 最终答案 (文本)**

理解了这一点，你就抓住了 VQA 模型中文本处理和数字映射的关键原理了！

------

## 尝试写了一个mini-vqa模型

结构很简单，图像使用resnet18提取出512维特征，问题也是得到512维特征，之后两个相拼接（特征融合），并且从得到答案

![a80e79c486cdd4b0d4eb34fc28090d51](https://malanhuakai.oss-cn-nanjing.aliyuncs.com/malanhuakai/a80e79c486cdd4b0d4eb34fc28090d51.png)

![image-20250626172722596](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250626172722596.png)

![image-20250626172734930](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250626172734930.png)

![image-20250626172748879](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250626172748879.png)

使用val数据集（Question为）进行计算正确率：

| 训练轮数 | Accuracy            |
| -------- | ------------------- |
| 5        | 0.43181743366910263 |
| 10       | 0.42779313977220357 |
| 15       | 0.4269207979458819  |
| 20       | 0.4191026400684706  |

---



## 和官方的进行对比

官方的评估脚本https://github.com/GT-Vision-Lab/VQA

官方的测试baselinehttps://github.com/hengyuan-hu/bottom-up-attention-vqa