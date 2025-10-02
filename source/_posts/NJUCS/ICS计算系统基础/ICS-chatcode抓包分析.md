---
categories:
  - NJUCS
  - ICS计算系统基础
---

使用BurpSuite对即将发布的ics-chatbot的抓包分析

---

### ICS chat-bot接口

使用BurpSuite抓包可以发现如下接口：

#### 1. 登录接口

**POST** `/login`

- 请求需要包含JSON格式的`token`：
    
    JSON
    
    ```
    {
        'token': YOUR_TOKEN
    }
    ```
    
- 响应中会包含`Set-Cookie: user_session=XXX`，请务必保存此`user_session`，后续所有请求都需要将其作为**Cookie**发送。
    

**请求示例:**

HTTP

```
POST /login HTTP/1.1
Host: 114.212.10.249:8080
...
Content-Type: application/x-www-form-urlencoded
...
Cookie: user_session=816368583df0135efaf9e8ceae0ff49b%2Fbedd3a284c8ef8265dad6337a6be88030338355463fe06b9c5d1768f0ff685012bcfcd095d178a5122328a1a12176ea0%3Ad3a3b7d857aae084cbc3d965d5c5458c4bba6158f13fddabbf73d03b39e0d353
...

token=8G5qU3qh
```

**响应示例:**

HTTP

```
HTTP/1.1 302 Found
Location: /
Set-Cookie: user_session=4879632ae07684697b8194e723d7981e%2F052e37e1d6419850b6274a67627915feaaee438c5fd4be6fb847f29278b6a6e59cdc91477b596dd0dda95d45041c3249%3Aafc6186e7618766a1c442053ea0ae7d42a5aaa9537534e09ff2fe23fcfa5bd02; Max-Age=604800; Expires=Tue, 07 Oct 2025 00:52:00 GMT; Path=/; HttpOnly; SameSite=lax; $x-enc=URI_ENCODING
...
```

---

#### 2. 建立WebSocket连接

**GET** `/`

- 请求头中需添加：
    
    - `Upgrade: websocket`
        
    - `Cookie: user_session=...`
        

**完整请求示例:**

HTTP

```
GET / HTTP/1.1
Host: 114.212.10.249:8080
...
Upgrade: websocket
Connection: keep-alive, Upgrade
Cookie: user_session=...
...
```

**响应示例:**

HTTP

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: lSwjjGTK1ZieZ05mBhUo3OwmtXU=
```

---

#### 3. 清除历史记录

**POST** `/clearHistory`

- 请求头中需包含`user_session` **cookie**。
    
- 请求体为空。
    

**请求示例:**

HTTP

```
POST /clearHistory HTTP/1.1
Host: 114.212.10.249:8080
...
Cookie: user_session=...
...
Content-Length: 0
```

**响应示例:**

HTTP

```
HTTP/1.1 200 OK
...
```

---

#### 4. 强制停止对话

**POST** `/rescue`

- 请求头中需包含`user_session` **cookie**。
    
- 请求体为空。
    

**请求示例:**

HTTP

```
POST /rescue HTTP/1.1
Host: 114.212.10.249:8080
...
Cookie: user_session=...
...
Content-Length: 0
```

**响应示例:**

HTTP

```
HTTP/1.1 200 OK
...
```

---

#### 5. WebSocket通信流程

- a. 客户端发送消息:
    
    直接通过已建立的WebSocket连接发送对话内容。
    
- **b. 服务器响应**:
    
    - 首先发送字符`"S"`作为开始标记（**Start**）。
        
    - 之后发送的消息以`"T"`开头，后面跟着实际的回复内容，服务器采用流式响应。
        
    - 最后以字符`"E"`作为结束标记。
        
    - **注意**：在正式回复结束之前，服务器可能会发送一个单独的、类似如下的回复，用于前端展示参考文献。类似的还有一个`[!Note]`格式的回复。
        
        ```
        T
        > [!TIP]
        > **参考文献**
        >
        > proc.c, logo.c, 3.3.html, 4.2.html, 1.1.html, trm.c, linux.html
        ```
        

**通信示例:**

- **Client** -> **Server**: `"你好"`
    
- **Server** -> **Client**: `"S"`
    
- **Server** -> **Client**: `"T你"`
    
- **Server** -> **Client**: `"T好"`
    
- **Server** -> **Client**: `"！"`
    
- **Server** -> **Client**: `"E"`
    

---

#### 6. 对话总结

在WebSocket通信中，向服务器发送`"$$"`即可触发对话总结功能。（但是我暂未研究其回复结果）

---

#### 7. Server端的防御策略

- 约在9月29日左右，助教添加了登录限制，错误码为`1008`，防止双开。
- 此前已经存在速率限制，以防止短时间内高频次请求服务。
---

#### 8. 自己搭建对话网页

- 有了这些接口，可以自己搭建网页或脚本来弥补现有功能（如上下文保存、多对话管理）。
    
- 目前前端使用**Vue**，后端使用**Python**  网址：`http://172.26.8.119:4173/`。除了ICS对话，该网页还支持查询RISC-V的PA作业。（但是我不清楚其他的PA是怎么查询的）