---
title: 例会汇报 | 第十次&第11次
categories:
  - 科研启蒙
  - Reports
date: 2025-07-06 00:00:00
---

之前在服务器上面尝试跑过两个模型，均已存档，分别保存在model-6-28和model-7-2

模型的结构是

![a80e79c486cdd4b0d4eb34fc28090d51](https://malanhuakai.oss-cn-nanjing.aliyuncs.com/malanhuakai/a80e79c486cdd4b0d4eb34fc28090d51.png)

## Baseline 

baseline模型在vqa-v2 validation上的指标为：

```text
Evaluating epoch 10
Use vqa_v2_image_id_path_map.json
Accuracy: 0.5273659460518582
Evaluating epoch 20
Use vqa_v2_image_id_path_map.json
Accuracy: 0.6017429112589455
Evaluating epoch 30
Use vqa_v2_image_id_path_map.json
Accuracy: 0.651301118710171
Evaluating epoch 40
Use vqa_v2_image_id_path_map.json
Accuracy: 0.6644895826529946
Evaluating epoch 50
Use vqa_v2_image_id_path_map.json
Accuracy: 0.6895276038702334
Evaluating epoch 60
Use vqa_v2_image_id_path_map.json
Accuracy: 0.6949858645045113
Evaluating epoch 70
Use vqa_v2_image_id_path_map.json
Accuracy: 0.6958582531699898
Evaluating epoch 80
Use vqa_v2_image_id_path_map.json
Accuracy: 0.6959888782108101
Evaluating epoch 90
Use vqa_v2_image_id_path_map.json
Accuracy: 0.696348097073066
Evaluating epoch 100
Use vqa_v2_image_id_path_map.json
Accuracy: 0.6969685660169626
```



模型结构：

```cpp
class VQA_Model(nn.Module):
    def __init__(self,vocab_size,answer_size,hidden_size=512):
        super(VQA_Model,self).__init__()
        # 1. 图像编码器 (img_encoder)
        resnet = models.resnet18(pretrained=True)
        self.img_encoder = nn.Sequential(*list(resnet.children())[:-1])
        # 冻结图像编码器的参数
        for p in self.img_encoder.parameters():
            p.requires_grad = False
        # 2. 问题编码器 (question_encoder)
        self.embed=nn.Embedding(vocab_size,hidden_size)
        self.classifier=nn.Sequential(
            nn.Linear(512+hidden_size,1024),
            nn.ReLU(),
            nn.Linear(1024,answer_size)
        )
    def forward(self,image,question):
        image_features = self.img_encoder(image)
        image_features = image_features.view(image.size(0), -1) 
        question_features=self.embed(question).mean(dim=1)
        combined_features=torch.cat([image_features,question_features],dim=1)
        output=self.classifier(combined_features)
        return output
```



---

## A Failed Attempt Using LSTM

```python
class VQA_Model(nn.Module):
    def __init__(self,vocab_size,answer_size,hidden_size=512):
        super(VQA_Model,self).__init__()
        # 1. 图像编码器 (img_encoder)
        resnet = models.resnet18(pretrained=True)
        self.img_encoder = nn.Sequential(*list(resnet.children())[:-1])
        # 冻结图像编码器的参数
        for p in self.img_encoder.parameters():
            p.requires_grad = False

        # 2. 问题编码器 (question_encoder)
        self.q_lstm = nn.LSTM(
            input_size=512,
            hidden_size=512,
            num_layers=1,
            batch_first=True
        )
        self.spatial_attention = nn.Sequential(nn.Conv2d(512,1,kernel_size=1),nn.Sigmoid())
        self.embed = nn.Embedding(vocab_size,hidden_size)
        self.classifier=nn.Sequential(
            nn.Linear(512+hidden_size,1024),
            nn.ReLU(),
            nn.Linear(1024,answer_size)
        )
    def forward(self,image,question):
        image_features = self.img_encoder(image)
        #image_features = image_features.view(image.size(0), -1) 
	#6月30日改成了注意力机制
        attention_map= self.spatial_attention(image_features)
        attended_image_features=image_features*attention_map
        attended_image_features=attended_image_features.view(image.size(0),-1)
        question_features=self.embed(question)
        question_features, _ = self.q_lstm(question_features)
        question_features = question_features[:, -1, :]
        combined_features=torch.cat([attended_image_features,question_features],dim=1)
        output=self.classifier(combined_features)
        return output
```

## Solution on that



Failed:

```cpp
class VQA_Model(nn.Module):
    def __init__(self,vocab_size,answer_size,hidden_size=512):
        super(VQA_Model,self).__init__()
        # 1. 图像编码器 (img_encoder)
        resnet = models.resnet18(pretrained=True)
        self.img_encoder = nn.Sequential(*list(resnet.children())[:-1])
        # 冻结图像编码器的参数
        for p in self.img_encoder.parameters():
            p.requires_grad = False

        # 2. 问题编码器 (question_encoder)
        self.q_lstm = nn.LSTM(
            input_size=512,
            hidden_size=512,
            num_layers=1,
            batch_first=True
        )
        self.question_attention_linear = nn.Linear(hidden_size, 1)
        self.spatial_attention = nn.Sequential(nn.Conv2d(512,1,kernel_size=1),nn.Sigmoid())
        self.embed = nn.Embedding(vocab_size,hidden_size)
        self.classifier=nn.Sequential(
            nn.Linear(512+hidden_size,1024),
            nn.ReLU(),
            nn.Linear(1024,answer_size)
        )
    def forward(self,image,question):
        image_features = self.img_encoder(image)
        attention_map = self.spatial_attention(image_features)
        attended_image_features=image_features*attention_map
        attended_image_features=attended_image_features.view(image.size(0),-1)
        question_features = self.embed(question)
        # LSTM 输出 question_features 的形状是 (batch_size, seq_len, hidden_size)
        question_features, _ = self.q_lstm(question_features)
        # ====== 修改：应用注意力机制来聚合 LSTM 输出 ======
        attention_scores = self.question_attention_linear(question_features)
        attention_weights = torch.softmax(attention_scores, dim=1)
        question_features = torch.sum(question_features * attention_weights, dim=1)
        # ====== 结束修改 ======
        combined_features=torch.cat([attended_image_features,question_features],dim=1)
        output=self.classifier(combined_features)
        return output
```

---

重新训练了model-6-29,只使用了vqa-v2数据集，并且将上面三种结构的模型进行一个横向对比：

**模型一**

>   question_features = self.embed(question).mean(dim=1)

```
Use MSCOCO_image_id_path_map.json
Using Device:  cuda
Epoch10
100%|██████████| 419/419 [04:09<00:00,  1.68it/s]
Accuracy: 0.4185
Loss: 2.2599
Epoch20
100%|██████████| 419/419 [05:21<00:00,  1.30it/s]
Accuracy: 0.4080
Loss: 2.7145
Epoch30
100%|██████████| 419/419 [05:10<00:00,  1.35it/s]
Accuracy: 0.4057
Loss: 3.2608
Epoch40
100%|██████████| 419/419 [06:16<00:00,  1.11it/s]
Accuracy: 0.4019
Loss: 3.8281
Epoch50
100%|██████████| 419/419 [06:14<00:00,  1.12it/s]
Accuracy: 0.4016
Loss: 4.4108
```

**模型二**：

>   ```py
>   self.q_lstm = nn.LSTM(
>           input_size=512,
>           hidden_size=512,
>           num_layers=1,
>           batch_first=True)
>   question_features=self.embed(question)
>   question_features, _ = self.q_lstm(question_features)
>   question_features = question_features[:, -1, :]
>   ```

>   由于模型不慎被覆盖，没有计算相关数据

**模型三：**

>   ```py
>         # 2. 问题编码器 (question_encoder)
>           self.q_lstm = nn.LSTM(
>               input_size=512,
>               hidden_size=512,
>               num_layers=1,
>               batch_first=True
>           )
>           self.question_attention_linear = nn.Linear(hidden_size, 1)
>   question_features = self.embed(question)
>       # LSTM 输出 question_features 的形状是 (batch_size, seq_len, hidden_size)
>       question_features, _ = self.q_lstm(question_features)
>       # ====== 修改：应用注意力机制来聚合 LSTM 输出 ======
>       attention_scores = self.question_attention_linear(question_features)
>       attention_weights = torch.softmax(attention_scores, dim=1)
>       question_features = torch.sum(question_features * attention_weights, dim=1)
>       # ====== 结束修改 ======
>   ```

```
Use MSCOCO_image_id_path_map.json
Using Device:  cuda:1
Epoch10
100%|██████████| 419/419 [05:18<00:00,  1.32it/s]
Accuracy: 0.4402
Loss: 2.4808
Epoch20
100%|██████████| 419/419 [04:57<00:00,  1.41it/s]
Accuracy: 0.4218
Loss: 3.9324
Epoch30
100%|██████████| 419/419 [06:06<00:00,  1.14it/s]
Accuracy: 0.4190
Loss: 5.2839
Epoch40
100%|██████████| 419/419 [06:12<00:00,  1.13it/s]
Accuracy: 0.4133
Loss: 6.3854
Epoch50
100%|██████████| 419/419 [04:44<00:00,  1.47it/s]
Accuracy: 0.4149
Loss: 7.3706
Epoch60
100%|██████████| 419/419 [04:14<00:00,  1.64it/s]
Accuracy: 0.4134
Loss: 8.1589
Epoch70
```

---

**模型四**：（model-7-14）

```py
class VQA_Model(nn.Module):
    def __init__(self,vocab_size,answer_size,hidden_size=512):
        super(VQA_Model, self).__init__()
        resnet = models.resnet18(pretrained=True)
        modules = list(resnet.children())[:-2]
        self.cnn = nn.Sequential(*modules)
        for p in self.cnn.parameters():
            p.requires_grad = False
        self.image_feature_dim = 512 
        self.embed=nn.Embedding(vocab_size,hidden_size)
        self.classifier=nn.Sequential(
            nn.Linear(hidden_size,1024),
            nn.ReLU(),
            nn.Linear(1024,answer_size)
        )
        self.softmax=nn.Softmax(dim=1)
        self.k= 128 # 这个参数是vQ和u生成p_A过程中的一个维度
        self.fc1=nn.Linear(self.image_feature_dim,self.k)
        self.fc2=nn.Linear(hidden_size,self.k)
        self.b_A = nn.Parameter(torch.randn(self.k))
        self.fc3=nn.Linear(self.k,1)
    def forward(self,image,question):
        image_features_map = self.cnn(image) # 形状: (batch_size, D_cnn, H_out, W_out) e.g., (batch_size, 512, 14, 14)
        batch_size = image_features_map.shape[0]
        d_cnn = image_features_map.shape[1] 
        h_out = image_features_map.shape[2]  
        w_out = image_features_map.shape[3]  
        m = h_out * w_out # 196 (区域数量)
        # 7月14日更正： 每一次都计算一次具体的数值，便于之后切换模型
        v_I = image_features_map.view(batch_size, d_cnn, m).transpose(1, 2)
        v_Q=self.embed(question).mean(dim=1)
        h_A=self.fc1(v_I)+(self.fc2(v_Q)+self.b_A).unsqueeze(1)
        p_I= self.softmax(self.fc3(h_A).squeeze(2)) 
        v_I_a = (p_I.unsqueeze(2) * v_I).sum(dim=1)
        u_1= v_I_a+ v_Q
        return self.classifier(u_1)
```



鉴于acc在10个epoch之后一直下降，并且训练的数目越多，准确率越降低，于是我猜测最好的模型应该在5-10个epoch之间，于是，我将model-6-28和model-7-2-refined两个模型重新进行训练：

数据集：vqa-v2

训练次数：15个epoch

训练时间：model-6-28用时100min，model-7-2-refined用时150min

训练结果：



详细的训练数据：

Mode 1

```text
Use MSCOCO_image_id_path_map.json
Use MSCOCO_image_id_path_map.json
Loading vocabulary from vocab...
Vocabulary loaded successfully.
Epoch 1/15: 100%|██████████| 867/867 [07:11<00:00,  2.01it/s]
Epoch 1/15, Average Loss: 3.0484
Validating: 100%|██████████| 419/419 [03:23<00:00,  2.06it/s]
Accuracy: 0.3773
Loss: 2.4807
Epoch 2/15: 100%|██████████| 867/867 [07:19<00:00,  1.97it/s]
Epoch 2/15, Average Loss: 2.2613
Validating: 100%|██████████| 419/419 [03:25<00:00,  2.04it/s]
Accuracy: 0.3955
Loss: 2.2361
Epoch 3/15: 100%|██████████| 867/867 [07:21<00:00,  1.97it/s]
Epoch 3/15, Average Loss: 2.0160
Validating: 100%|██████████| 419/419 [03:25<00:00,  2.04it/s]
Accuracy: 0.3992
Loss: 2.1677
Epoch 4/15: 100%|██████████| 867/867 [07:20<00:00,  1.97it/s]
Epoch 4/15, Average Loss: 1.8614
Validating: 100%|██████████| 419/419 [03:26<00:00,  2.03it/s]
Accuracy: 0.4101
Loss: 2.1314
Epoch 5/15: 100%|██████████| 867/867 [07:21<00:00,  1.97it/s]
Epoch 5/15, Average Loss: 1.7432
Validating: 100%|██████████| 419/419 [03:29<00:00,  2.00it/s]
Accuracy: 0.4140
Loss: 2.1298
Epoch 6/15: 100%|██████████| 867/867 [07:23<00:00,  1.96it/s]
Epoch 6/15, Average Loss: 1.6449
Validating: 100%|██████████| 419/419 [03:24<00:00,  2.05it/s]
Accuracy: 0.4078
Loss: 2.1534
Epoch 7/15: 100%|██████████| 867/867 [07:19<00:00,  1.97it/s]
Epoch 7/15, Average Loss: 1.5597
Validating: 100%|██████████| 419/419 [03:25<00:00,  2.04it/s]
Accuracy: 0.4131
Loss: 2.1661
Epoch 8/15: 100%|██████████| 867/867 [07:21<00:00,  1.96it/s]
Epoch 8/15, Average Loss: 1.4839
Validating: 100%|██████████| 419/419 [03:25<00:00,  2.04it/s]
Accuracy: 0.4161
Loss: 2.2032
Epoch 9/15: 100%|██████████| 867/867 [07:17<00:00,  1.98it/s]
Epoch 9/15, Average Loss: 1.4187
Validating: 100%|██████████| 419/419 [04:45<00:00,  1.47it/s]
Accuracy: 0.4107
Loss: 2.2466
Epoch 10/15: 100%|██████████| 867/867 [10:16<00:00,  1.41it/s]
Epoch 10/15, Average Loss: 1.3614
Validating: 100%|██████████| 419/419 [04:58<00:00,  1.41it/s]
Accuracy: 0.4171
Loss: 2.2912
Epoch 11/15: 100%|██████████| 867/867 [10:12<00:00,  1.41it/s]
Epoch 11/15, Average Loss: 1.3103
Validating: 100%|██████████| 419/419 [05:01<00:00,  1.39it/s]
Accuracy: 0.4116
Loss: 2.3398
Epoch 12/15: 100%|██████████| 867/867 [10:17<00:00,  1.40it/s]
Epoch 12/15, Average Loss: 1.2628
Validating: 100%|██████████| 419/419 [04:58<00:00,  1.40it/s]
Accuracy: 0.4153
Loss: 2.3894
Epoch 13/15: 100%|██████████| 867/867 [10:10<00:00,  1.42it/s]
Epoch 13/15, Average Loss: 1.2222
Validating: 100%|██████████| 419/419 [04:59<00:00,  1.40it/s]
Accuracy: 0.4170
Loss: 2.4406
Epoch 14/15: 100%|██████████| 867/867 [10:15<00:00,  1.41it/s]
Epoch 14/15, Average Loss: 1.1849
Validating: 100%|██████████| 419/419 [05:00<00:00,  1.39it/s]
Accuracy: 0.4150
Loss: 2.4621
Epoch 15/15: 100%|██████████| 867/867 [10:11<00:00,  1.42it/s]
Epoch 15/15, Average Loss: 1.1505
Validating: 100%|██████████| 419/419 [05:01<00:00,  1.39it/s]
Accuracy: 0.4124
Loss: 2.5393
```

实际上第5个epoch就基本没有提升了



Model2:

```
Epoch 1/15: 100%|██████████| 867/867 [10:15<00:00,  1.41it/s]
Epoch 1/15, Average Loss: 2.6244
Validating: 100%|██████████| 419/419 [04:58<00:00,  1.40it/s]
Accuracy: 0.4008
Loss: 2.1095
Epoch 2/15: 100%|██████████| 867/867 [10:15<00:00,  1.41it/s]
Epoch 2/15, Average Loss: 1.9068
Validating: 100%|██████████| 419/419 [04:58<00:00,  1.40it/s]
Accuracy: 0.4340
Loss: 1.9462
Epoch 3/15: 100%|██████████| 867/867 [10:13<00:00,  1.41it/s]
Epoch 3/15, Average Loss: 1.6859
Validating: 100%|██████████| 419/419 [04:58<00:00,  1.40it/s]
Accuracy: 0.4398
Loss: 1.9197
Epoch 4/15: 100%|██████████| 867/867 [10:19<00:00,  1.40it/s]
Epoch 4/15, Average Loss: 1.5274
Validating: 100%|██████████| 419/419 [04:59<00:00,  1.40it/s]
Accuracy: 0.4458
Loss: 1.9412
Epoch 5/15: 100%|██████████| 867/867 [10:17<00:00,  1.40it/s]
Epoch 5/15, Average Loss: 1.3875
Validating: 100%|██████████| 419/419 [05:00<00:00,  1.39it/s]
Accuracy: 0.4441
Loss: 1.9828
Epoch 6/15: 100%|██████████| 867/867 [10:18<00:00,  1.40it/s]
Epoch 6/15, Average Loss: 1.2566
Validating: 100%|██████████| 419/419 [04:57<00:00,  1.41it/s]
Accuracy: 0.4465
Loss: 2.0777
--- Saving model and evaluating after Epoch 7 ---
2025-07-14 23:25:11,734 - INFO - Model saved to model-2/model_epoch_7.pth
2025-07-14 23:25:11,735 - INFO - Running evaluation on validation set...
2025-07-14 23:28:42,473 - INFO - Accuracy: 0.4419
2025-07-14 23:28:42,474 - INFO - Loss: 2.1604
2025-07-14 23:28:42,478 - INFO - Validation Accuracy: 0.4419, Validation Loss: 2.1604
2025-07-14 23:28:42,479 - INFO - --------------------------------
2025-07-14 23:36:26,647 - INFO - Epoch 8/15, Average Loss: 1.0292
2025-07-14 23:36:26,647 - INFO - ---
2025-07-14 23:36:26,647 - INFO - 
--- Saving model and evaluating after Epoch 8 ---
2025-07-14 23:36:26,834 - INFO - Model saved to model-2/model_epoch_8.pth
2025-07-14 23:36:26,834 - INFO - Running evaluation on validation set...
2025-07-14 23:40:03,044 - INFO - Accuracy: 0.4446
2025-07-14 23:40:03,044 - INFO - Loss: 2.2963
2025-07-14 23:40:03,045 - INFO - Validation Accuracy: 0.4446, Validation Loss: 2.2963
2025-07-14 23:40:03,045 - INFO - --------------------------------
2025-07-14 23:47:58,770 - INFO - Epoch 9/15, Average Loss: 0.9360
2025-07-14 23:47:58,770 - INFO - ---
2025-07-14 23:47:58,771 - INFO - 
--- Saving model and evaluating after Epoch 9 ---
2025-07-14 23:47:58,983 - INFO - Model saved to model-2/model_epoch_9.pth
2025-07-14 23:47:58,983 - INFO - Running evaluation on validation set...
2025-07-14 23:52:29,471 - INFO - Accuracy: 0.4446
2025-07-14 23:52:29,473 - INFO - Loss: 2.3849
2025-07-14 23:52:29,473 - INFO - Validation Accuracy: 0.4446, Validation Loss: 2.3849
2025-07-14 23:52:29,474 - INFO - --------------------------------
2025-07-15 00:02:34,321 - INFO - Epoch 10/15, Average Loss: 0.8512
2025-07-15 00:02:34,322 - INFO - ---
2025-07-15 00:02:34,322 - INFO - 
--- Saving model and evaluating after Epoch 10 ---
2025-07-15 00:02:34,557 - INFO - Model saved to model-2/model_epoch_10.pth
2025-07-15 00:02:34,557 - INFO - Running evaluation on validation set...
2025-07-15 00:07:32,042 - INFO - Accuracy: 0.4381
2025-07-15 00:07:32,042 - INFO - Loss: 2.5163
2025-07-15 00:07:32,044 - INFO - Validation Accuracy: 0.4381, Validation Loss: 2.5163
2025-07-15 00:07:32,044 - INFO - --------------------------------
2025-07-15 00:17:49,403 - INFO - Epoch 11/15, Average Loss: 0.7788
2025-07-15 00:17:49,403 - INFO - ---
2025-07-15 00:17:49,404 - INFO - 
--- Saving model and evaluating after Epoch 11 ---
2025-07-15 00:17:49,630 - INFO - Model saved to model-2/model_epoch_11.pth
2025-07-15 00:17:49,630 - INFO - Running evaluation on validation set...
2025-07-15 00:22:47,713 - INFO - Accuracy: 0.4388
2025-07-15 00:22:47,714 - INFO - Loss: 2.6451
2025-07-15 00:22:47,714 - INFO - Validation Accuracy: 0.4388, Validation Loss: 2.6451
2025-07-15 00:22:47,714 - INFO - --------------------------------
2025-07-15 00:33:01,897 - INFO - Epoch 12/15, Average Loss: 0.7123
2025-07-15 00:33:01,898 - INFO - ---
2025-07-15 00:33:01,899 - INFO - 
--- Saving model and evaluating after Epoch 12 ---
2025-07-15 00:33:02,118 - INFO - Model saved to model-2/model_epoch_12.pth
2025-07-15 00:33:02,119 - INFO - Running evaluation on validation set...
2025-07-15 00:37:59,538 - INFO - Accuracy: 0.4352
2025-07-15 00:37:59,538 - INFO - Loss: 2.7984
2025-07-15 00:37:59,540 - INFO - Validation Accuracy: 0.4352, Validation Loss: 2.7984
2025-07-15 00:37:59,540 - INFO - --------------------------------
2025-07-15 00:48:16,068 - INFO - Epoch 13/15, Average Loss: 0.6526
2025-07-15 00:48:16,070 - INFO - ---
2025-07-15 00:48:16,070 - INFO - 
--- Saving model and evaluating after Epoch 13 ---
2025-07-15 00:48:16,298 - INFO - Model saved to model-2/model_epoch_13.pth
2025-07-15 00:48:16,298 - INFO - Running evaluation on validation set...
2025-07-15 00:53:13,832 - INFO - Accuracy: 0.4336
2025-07-15 00:53:13,832 - INFO - Loss: 2.9345
2025-07-15 00:53:13,834 - INFO - Validation Accuracy: 0.4336, Validation Loss: 2.9345
2025-07-15 00:53:13,834 - INFO - --------------------------------
2025-07-15 01:03:28,461 - INFO - Epoch 14/15, Average Loss: 0.6000
2025-07-15 01:03:28,461 - INFO - ---
2025-07-15 01:03:28,461 - INFO - 
--- Saving model and evaluating after Epoch 14 ---
2025-07-15 01:03:28,694 - INFO - Model saved to model-2/model_epoch_14.pth
2025-07-15 01:03:28,695 - INFO - Running evaluation on validation set...
2025-07-15 01:08:25,722 - INFO - Accuracy: 0.4358
2025-07-15 01:08:25,723 - INFO - Loss: 3.1118
2025-07-15 01:08:25,724 - INFO - Validation Accuracy: 0.4358, Validation Loss: 3.1118
2025-07-15 01:08:25,724 - INFO - --------------------------------
2025-07-15 01:18:39,512 - INFO - Epoch 15/15, Average Loss: 0.5510
2025-07-15 01:18:39,512 - INFO - ---
2025-07-15 01:18:39,512 - INFO - 
--- Saving model and evaluating after Epoch 15 ---
2025-07-15 01:18:39,729 - INFO - Model saved to model-2/model_epoch_15.pth
2025-07-15 01:18:39,729 - INFO - Running evaluation on validation set...
2025-07-15 01:23:38,861 - INFO - Accuracy: 0.4307
2025-07-15 01:23:38,861 - INFO - Loss: 3.1711
2025-07-15 01:23:38,863 - INFO - Validation Accuracy: 0.4307, Validation Loss: 3.1711
2025-07-15 01:23:38,864 - INFO - --------------------------------

```



Model 3：

```cpp
2025-07-14 23:52:33,153 - INFO - 模型二训练 model-7-14
2025-07-14 23:52:33,153 - INFO - Start A New Training, log_dir: model-3
2025-07-14 23:52:57,599 - INFO - Save every epochs: 1
2025-07-15 00:03:10,815 - INFO - Epoch 1/15, Average Loss: 3.2105
2025-07-15 00:03:10,816 - INFO - ---
2025-07-15 00:03:10,817 - INFO - 
--- Saving model and evaluating after Epoch 1 ---
2025-07-15 00:03:11,041 - INFO - Model saved to model-3/model_epoch_1.pth
2025-07-15 00:03:11,042 - INFO - Running evaluation on validation set...
2025-07-15 00:08:10,308 - INFO - Accuracy: 0.3529
2025-07-15 00:08:10,314 - INFO - Loss: 2.6552
2025-07-15 00:08:10,314 - INFO - Validation Accuracy: 0.3529, Validation Loss: 2.6552
2025-07-15 00:08:10,314 - INFO - --------------------------------
2025-07-15 00:18:23,356 - INFO - Epoch 2/15, Average Loss: 2.4078
2025-07-15 00:18:23,356 - INFO - ---
2025-07-15 00:18:23,357 - INFO - 
--- Saving model and evaluating after Epoch 2 ---
2025-07-15 00:18:23,562 - INFO - Model saved to model-3/model_epoch_2.pth
2025-07-15 00:18:23,562 - INFO - Running evaluation on validation set...
2025-07-15 00:23:22,221 - INFO - Accuracy: 0.3763
2025-07-15 00:23:22,221 - INFO - Loss: 2.3913
2025-07-15 00:23:22,221 - INFO - Validation Accuracy: 0.3763, Validation Loss: 2.3913
2025-07-15 00:23:22,224 - INFO - --------------------------------
2025-07-15 00:33:37,415 - INFO - Epoch 3/15, Average Loss: 2.1219
2025-07-15 00:33:37,415 - INFO - ---
2025-07-15 00:33:37,415 - INFO - 
--- Saving model and evaluating after Epoch 3 ---
2025-07-15 00:33:37,664 - INFO - Model saved to model-3/model_epoch_3.pth
2025-07-15 00:33:37,665 - INFO - Running evaluation on validation set...
2025-07-15 00:38:36,318 - INFO - Accuracy: 0.3876
2025-07-15 00:38:36,319 - INFO - Loss: 2.2888
2025-07-15 00:38:36,320 - INFO - Validation Accuracy: 0.3876, Validation Loss: 2.2888
2025-07-15 00:38:36,321 - INFO - --------------------------------
2025-07-15 00:48:53,172 - INFO - Epoch 4/15, Average Loss: 1.9319
2025-07-15 00:48:53,173 - INFO - ---
2025-07-15 00:48:53,173 - INFO - 
--- Saving model and evaluating after Epoch 4 ---
2025-07-15 00:48:53,396 - INFO - Model saved to model-3/model_epoch_4.pth
2025-07-15 00:48:53,397 - INFO - Running evaluation on validation set...
2025-07-15 00:53:56,342 - INFO - Accuracy: 0.3947
2025-07-15 00:53:56,343 - INFO - Loss: 2.2570
2025-07-15 00:53:56,344 - INFO - Validation Accuracy: 0.3947, Validation Loss: 2.2570
2025-07-15 00:53:56,344 - INFO - --------------------------------
2025-07-15 01:04:07,519 - INFO - Epoch 5/15, Average Loss: 1.7839
2025-07-15 01:04:07,520 - INFO - ---
2025-07-15 01:04:07,520 - INFO - 
--- Saving model and evaluating after Epoch 5 ---
2025-07-15 01:04:07,734 - INFO - Model saved to model-3/model_epoch_5.pth
2025-07-15 01:04:07,734 - INFO - Running evaluation on validation set...
2025-07-15 01:09:06,658 - INFO - Accuracy: 0.3999
2025-07-15 01:09:06,659 - INFO - Loss: 2.2633
2025-07-15 01:09:06,660 - INFO - Validation Accuracy: 0.3999, Validation Loss: 2.2633
2025-07-15 01:09:06,660 - INFO - --------------------------------
2025-07-15 01:19:22,122 - INFO - Epoch 6/15, Average Loss: 1.6581
2025-07-15 01:19:22,122 - INFO - ---
2025-07-15 01:19:22,122 - INFO - 
--- Saving model and evaluating after Epoch 6 ---
2025-07-15 01:19:22,337 - INFO - Model saved to model-3/model_epoch_6.pth
2025-07-15 01:19:22,337 - INFO - Running evaluation on validation set...
2025-07-15 01:24:12,056 - INFO - Accuracy: 0.3990
2025-07-15 01:24:12,057 - INFO - Loss: 2.2910
2025-07-15 01:24:12,057 - INFO - Validation Accuracy: 0.3990, Validation Loss: 2.2910
2025-07-15 01:24:12,057 - INFO - --------------------------------
2025-07-15 01:31:47,245 - INFO - Epoch 7/15, Average Loss: 1.5501
2025-07-15 01:31:47,245 - INFO - ---
2025-07-15 01:31:47,245 - INFO - 
--- Saving model and evaluating after Epoch 7 ---
2025-07-15 01:31:47,413 - INFO - Model saved to model-3/model_epoch_7.pth
2025-07-15 01:31:47,413 - INFO - Running evaluation on validation set...
2025-07-15 01:35:17,817 - INFO - Accuracy: 0.4009
2025-07-15 01:35:17,817 - INFO - Loss: 2.3232
2025-07-15 01:35:17,818 - INFO - Validation Accuracy: 0.4009, Validation Loss: 2.3232
2025-07-15 01:35:17,819 - INFO - --------------------------------
2025-07-15 01:42:55,178 - INFO - Epoch 8/15, Average Loss: 1.4566
2025-07-15 01:42:55,178 - INFO - ---
2025-07-15 01:42:55,178 - INFO - 
--- Saving model and evaluating after Epoch 8 ---
2025-07-15 01:42:55,335 - INFO - Model saved to model-3/model_epoch_8.pth
2025-07-15 01:42:55,335 - INFO - Running evaluation on validation set...
2025-07-15 01:46:26,033 - INFO - Accuracy: 0.4028
2025-07-15 01:46:26,033 - INFO - Loss: 2.3793
2025-07-15 01:46:26,034 - INFO - Validation Accuracy: 0.4028, Validation Loss: 2.3793
2025-07-15 01:46:26,035 - INFO - --------------------------------
2025-07-15 01:54:04,536 - INFO - Epoch 9/15, Average Loss: 1.3754
2025-07-15 01:54:04,536 - INFO - ---
2025-07-15 01:54:04,537 - INFO - 
--- Saving model and evaluating after Epoch 9 ---
2025-07-15 01:54:04,702 - INFO - Model saved to model-3/model_epoch_9.pth
2025-07-15 01:54:04,703 - INFO - Running evaluation on validation set...
2025-07-15 01:57:37,852 - INFO - Accuracy: 0.4021
2025-07-15 01:57:37,853 - INFO - Loss: 2.4269
2025-07-15 01:57:37,853 - INFO - Validation Accuracy: 0.4021, Validation Loss: 2.4269
2025-07-15 01:57:37,853 - INFO - --------------------------------
2025-07-15 02:05:15,181 - INFO - Epoch 10/15, Average Loss: 1.3039
2025-07-15 02:05:15,181 - INFO - ---
2025-07-15 02:05:15,183 - INFO - 
--- Saving model and evaluating after Epoch 10 ---
2025-07-15 02:05:15,379 - INFO - Model saved to model-3/model_epoch_10.pth
2025-07-15 02:05:15,379 - INFO - Running evaluation on validation set...
2025-07-15 02:08:47,073 - INFO - Accuracy: 0.4028
2025-07-15 02:08:47,073 - INFO - Loss: 2.4854
2025-07-15 02:08:47,074 - INFO - Validation Accuracy: 0.4028, Validation Loss: 2.4854
2025-07-15 02:08:47,074 - INFO - --------------------------------
2025-07-15 02:16:25,832 - INFO - Epoch 11/15, Average Loss: 1.2426
2025-07-15 02:16:25,833 - INFO - ---
2025-07-15 02:16:25,833 - INFO - 
--- Saving model and evaluating after Epoch 11 ---
2025-07-15 02:16:25,999 - INFO - Model saved to model-3/model_epoch_11.pth
2025-07-15 02:16:25,999 - INFO - Running evaluation on validation set...
2025-07-15 02:19:59,859 - INFO - Accuracy: 0.4013
2025-07-15 02:19:59,859 - INFO - Loss: 2.5545
2025-07-15 02:19:59,860 - INFO - Validation Accuracy: 0.4013, Validation Loss: 2.5545
2025-07-15 02:19:59,860 - INFO - --------------------------------
2025-07-15 02:27:32,272 - INFO - Epoch 12/15, Average Loss: 1.1865
2025-07-15 02:27:32,273 - INFO - ---
2025-07-15 02:27:32,274 - INFO - 
--- Saving model and evaluating after Epoch 12 ---
2025-07-15 02:27:32,438 - INFO - Model saved to model-3/model_epoch_12.pth
2025-07-15 02:27:32,439 - INFO - Running evaluation on validation set...
2025-07-15 02:31:04,379 - INFO - Accuracy: 0.3989
2025-07-15 02:31:04,380 - INFO - Loss: 2.6122
2025-07-15 02:31:04,380 - INFO - Validation Accuracy: 0.3989, Validation Loss: 2.6122
2025-07-15 02:31:04,380 - INFO - --------------------------------
2025-07-15 02:38:40,199 - INFO - Epoch 13/15, Average Loss: 1.1350
2025-07-15 02:38:40,200 - INFO - ---
2025-07-15 02:38:40,200 - INFO - 
--- Saving model and evaluating after Epoch 13 ---
2025-07-15 02:38:40,380 - INFO - Model saved to model-3/model_epoch_13.pth
2025-07-15 02:38:40,380 - INFO - Running evaluation on validation set...
2025-07-15 02:42:11,942 - INFO - Accuracy: 0.3984
2025-07-15 02:42:11,942 - INFO - Loss: 2.6879
2025-07-15 02:42:11,942 - INFO - Validation Accuracy: 0.3984, Validation Loss: 2.6879
2025-07-15 02:42:11,943 - INFO - --------------------------------
2025-07-15 02:49:52,821 - INFO - Epoch 14/15, Average Loss: 1.0911
2025-07-15 02:49:52,822 - INFO - ---
2025-07-15 02:49:52,822 - INFO - 
--- Saving model and evaluating after Epoch 14 ---
2025-07-15 02:49:52,989 - INFO - Model saved to model-3/model_epoch_14.pth
2025-07-15 02:49:52,989 - INFO - Running evaluation on validation set...
2025-07-15 02:53:25,289 - INFO - Accuracy: 0.3954
2025-07-15 02:53:25,290 - INFO - Loss: 2.7446
2025-07-15 02:53:25,290 - INFO - Validation Accuracy: 0.3954, Validation Loss: 2.7446
2025-07-15 02:53:25,290 - INFO - --------------------------------
2025-07-15 03:00:59,078 - INFO - Epoch 15/15, Average Loss: 1.0485
2025-07-15 03:00:59,079 - INFO - ---
2025-07-15 03:00:59,079 - INFO - 
--- Saving model and evaluating after Epoch 15 ---
2025-07-15 03:00:59,242 - INFO - Model saved to model-3/model_epoch_15.pth
2025-07-15 03:00:59,242 - INFO - Running evaluation on validation set...
2025-07-15 03:04:31,190 - INFO - Accuracy: 0.3991
2025-07-15 03:04:31,191 - INFO - Loss: 2.8151
2025-07-15 03:04:31,191 - INFO - Validation Accuracy: 0.3991, Validation Loss: 2.8151
2025-07-15 03:04:31,191 - INFO - --------------------------------
```

我把模型全部重新跑了一遍，相关细节：
- 训练数据集：vqa-v2 train
- 评估数据集： vqa-v2 val
- 训练轮次：15 epochs
- 单卡（batch_size= 512, num_workers=16) 训练时长从2-3h，每一个模型训练实际占用显存约5GB
结果如下：
![loss_comparison](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/loss_comparison.png)

![accuracy_comparison](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/accuracy_comparison.png)