---
author: Yama
date: 2025-09-24
tags:
  - tech
  - docker
  - nova
zhihu-link: https://zhuanlan.zhihu.com/p/1954220510616486296/edit
---


## 一个困扰许多人的问题

一个很常见的场景：你在 GitHub 上看到一个很有趣的 Python 项目，决定把它拿到 Windows 本地试试。你熟练地敲：

```
git clone git@github.com:yama-lei/demo.git
cd demo
```

发现仓库里有 `requirements.txt`，部署过多个python应用的你熟练地敲下：

```
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
```

然而命令刚跑没多久，就红了一大片错误：`error: XXX is required. Please XXXXX".`某个依赖是 C 扩展，pip 没找到合适的 wheel，要从源码编译。

你去问了 AI，AI回复了一大串，给了几条建议——安装 XXX、装上 XXX。你按照建议去做，装了几个XXX的构建工具，回到项目目录再跑一遍。终于，pip 的输出不再一直报错，慢慢地安装完了。

![](https://cdn.nlark.com/yuque/0/2025/png/46999547/1758245115259-b1f6d12a-0e51-4e9b-b9af-dcbc69e63b4d.png "寻求Qwen3 解决环境问题时的小插曲")

**Install Success!**

激动的心，颤抖的手，你高兴地敲下：`python app.py` 结果却是一堆 traceback：应用在导入 NumPy 的某个扩展模块时崩了，控制台报的是：`ImportError: numpy.core.multiarray failed to import`。你又查了下 `requirements.txt`，发现项目作者在文件里明确写了 `numpy==1.19.0`，但你之前因为随手更新过包，机器上现在装的是最新的 `numpy`。你试着把本地的 numpy 卸载，pip install 指定回 `1.19.0`，这次安装又失败了——因为你当前的 Python 版本和某些老 wheel 不兼容，pip 又试图从源码编译，编译又需要 XXX 等系统库。

来回折腾了好几次，你改过 `requirements.txt` 的版本组合、也尝试把Python 版本降低到和作者一致，问题一会儿是这里“缺系统库”，那里的版本不兼容。

时间就这样一点点耗掉。几个小时、甚至一天过去了，你最终还是放弃了部署这个项目，心里很不甘——到底是哪一环出错了？为什么在我机器上配置环境竟然这么难？

到这个时候，你的心里只剩下一个F开头K结尾的单词。

![](https://cdn.nlark.com/yuque/0/2025/png/46999547/1758096021392-2fde6ada-a3a5-407a-b23e-2ce7c3954b40.png)

不只是在部署别人的应用的时候才会发生这个问题：你在 Windows 上开发好的东西，一搬到 Linux 服务器上可能也又出一串新错误——系统包名不一样、编译器版本不一样......

环境配置是部署应用最大的麻烦事之一。怎么确保自己的应用能在服务器上跑起来？怎么把别人写好的东西拉到我这台电脑上就能跑？核心问题一句话——**开发环境和部署环境里各种库、系统依赖、编译工具、甚至系统包的版本不一致**，只要哪儿不对，软件就可能跑不起来。

## Docker : build once run anywhere

于是很多人会想：**如果能把运行时环境一并打包，把系统依赖、Python 包、配置文件都做成一个“镜像”，别人拿到就能完全一样地运行，不就省事了吗？**

这里知识拿python举一个例子，docker可以部署绝大部分的程序运行环境；

这就是 Docker 要解决的问题。

**Docker容器是一个在宿主机内核上运行的、被隔离的进程，但它拥有自己独立的文件系统环境**。

docker 有 Dockerfile 有镜像，有容器。镜像是打包好的环境，容器是镜像跑起来之后的实例，Dockerfile 是造镜像的配方。理解了这三个东西，基本上就能明白 Docker 在做什么。

![](https://cdn.nlark.com/yuque/0/2025/png/46999547/1758247324828-acd5142b-21f0-4cde-a075-58151f008b80.png "null")

|   |   |   |   |
|---|---|---|---|
|概念|定义|作用|类比|
|Dockerfile|一份文本文件，写明如何构建镜像的步骤|配置依赖、安装包、复制代码、设置启动命令|建房子的“施工图纸”|
|Image|根据 Dockerfile 构建出来的只读模板|打包好应用和环境，别人拿到就能复用|建好的“房子模型”|
|Container|基于镜像运行起来的实例（动态进程）|真正执行应用的地方，可以随开随关|住进去的“房子”|

Docker把应用和它的运行环境统一封装成一个“镜像”，别人不需要再重新配置，直接用镜像启动一个“容器”即可，"Build once, run anywhere"。

![](https://cdn.nlark.com/yuque/__mermaid_v3/ba99695fc423a3dede86a778300777db.svg)

Dockerfile 就好比一张建造说明书，里面有如何构建镜像的步骤。镜像是构建好的一个静态环境，而当你真正运行它的时候，这个集装箱才会变成一个容器，里面的应用进程、网络、文件系统都在那一刻活了过来。**镜像是静态的，容器是动态的；镜像可以复用，容器可以随开随关。**

## Docker如何使用

### Docker环境配置

对于windows和macos：下载docker desktop；[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

对于linux，直接通过命令行安装

需要sudo权限

### 用 Docker 来部署一些好玩的东西

现在 Github 上有很多应用都提供了 Docker 部署的选择，其中不少复杂的应用甚至把 **Docker 部署作为最推荐的方案。**拿一个机器人平台 **AstrBot**为例。官方文档里面在部署方面只有三行指令：

```
git clone https://github.com/AstrBotDevs/AstrBot
cd AstrBot
sudo docker compose up -d
```

考虑任何环境配置和兼容性问题。![](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250917164133911.png "null")

那它背后到底发生了什么呢？  
当我们第一次 `docker compose up` 或者 `docker run` 某个容器时，Docker 会先在本地看看是否存在对应的 **镜像（image）**。

- 如果已经有了，就直接用这个镜像创建一个新的 **容器（container）** 实例。
- 如果没有，docker 会自动去DockerHub上拉取。

第一次拉取镜像速度可能比较慢（可能需要配置科学上网或者配置docker镜像站点，国内访问速度比较慢），但以后只要敲一句 `docker start`，几乎立刻就能起来。

而且 Docker 还有一个好处：容器和宿主机是隔离的。容器里安装的各种包、各种配置，对于电脑本身不会有任何的影响。就算哪天这个容器崩了，你只需要一句 `docker rm` 把它删掉，再重新跑一次 `docker run`，环境就是干干净净的。

---

### Docker 基本指令

- `docker build . -t name`：自己写 Dockerfile，然后构建一个镜像。
- `docker run image-name`：基于镜像启动一个容器
- `docker stop container-name`：停止一个正在运行的容器（但**容器内**数据还在）。
- `docker rm container-name`：删除容器实例。
- `docker rmi image-name`：删除镜像。

## 那 Docker 到底是怎么工作的？

#### 1. 操作系统层面的虚拟化

Docker 的实现依赖几个关键机制。我们希望容器之间能够完全隔离，互不干扰，每一个容器都像是一个小小的 Linux“系统”。

注：这里称其为linux系统不太合适，实际上所有的docker容器都是在宿主机内核上运行的。

要实现这种“像系统一样”的效果，就需要几个核心机制。

第一个机制是 **命名空间（Namespaces）**。它负责隔离，让容器**误以为**自己独占了一套系统资源。  
比如：

- 网络命名空间会为容器分配独立的 IP 和端口；
- 文件系统命名空间则让容器只能看到自己的目录树，而看不到宿主机的完整文件系统。  
    正是这种隔离，让不同容器之间互不干扰。![](https://cdn.nlark.com/yuque/0/2025/png/46999547/1758117943828-5e2e0f71-ecc9-4399-9ba1-b79001cc16b3.png)

第二个机制是 **控制组**。它用来管理和限制容器的资源，比如 CPU、内存等。通过控制组，宿主机可以控制每个容器最多能用多少资源，避免某个容器无限制地占用，影响其他容器的运行。

除了隔离和限制，Docker 容器还有一个重要的特性：**无状态（Stateless）**。  
所谓“状态”，是指程序运行过程中产生的中间数据。无状态容器的意思是：容器在运行时不会把这些数据留在容器内部，而是统一存储在容器外部。如果容器被 remove，之前容器内的数据自然就消失了。

注：这里指的是容器内部的数据会消失，如果需要持久化，可以通过挂载把数据保存到宿主机上

要支撑这种无状态，Docker 依赖 **分层存储**。镜像并不是一个庞大的单一文件，而是由一层层文件系统叠加起来的。底层可能是只读的基础镜像，在它之上叠加一些包或配置。而当你运行容器时，Docker 只是在最上面加一个可写层，你的改动都会记录在这一层，底下的只读层保持不变。

总结起来就三个关键词：**进程隔离、资源限制、存储分层**。

#### 2.网络：容器怎么和外界、和其他容器通信？

- **默认 bridge 网络**：  
    Docker 启动的时候会自动建一个 `docker0` 网桥。每个容器都会连到这个网桥上，有自己的虚拟网卡和 IP。容器之间可以通过这个ip互相访问。但如果想让外界访问容器，就得 **做端口映射**，在运行的时候加上-p参数 比如`-p 8080:80`，这样访问 `localhost:8080` 就能进容器的 80 端口。

回顾前面的docker容器运行指令 docker run demo，如果需要将容器demo的8080端口服务映射到host的8080，那就需要用 docker run -p 8080:8080 demo

- **host 模式**：  
    有些场景需要直接把容器“接入”宿主机网络。这样容器没有独立 IP，直接用宿主机的网络栈。缺点是容易端口冲突。
- **容器间通信** ：  
    先用`docker network create` 创建网络，再通过 `--network` 让容器加入进去相互之间用名字来访问对方，比如说：

```
docker network create mynet
docker run --network mynet --name service-a ...
docker run --network mynet --name service-b ...
```

然后在service-a里面就可以通过[http://service-a:](http://service-a:8888)端口 来进行访问

1. DockerDesktop（win和mac上的）也可以通过docker.internal.host获取到主机的host进行通信

#### 3. 存储

Docker官网：docker适合做stateless的服务，而不适合做数据库等有状态的任务

默认情况下，容器里的数据就存在容器本身。容器一旦删掉，数据可能也跟着没了。

所以正确的做法是使用 -v 参数进行路径的映射

用 `-v ./data:/app/data` 把宿主机的目录挂载到容器里，这样数据都放在宿主机硬盘上，容器删了也不会丢。

参数为：-v 宿主机的路径:容器内部的路径，其中宿主机的路径既可以使用像“./data”,"/docker/data"之类的路径，也可以通过docker crteate volume 来创建一个卷，直接用卷来替代宿主机的路径，比如

```
docker create volume1
docker run -v volume1:/app/data demo
```

意思是 先创建一个叫 `volume1` 的卷，再运行一个 demo 容器，把这个卷挂载到容器的 `/app/data` 目录

**容器是一次性的，数据要放在宿主机或者卷里，才能持久化。**

## 再更高阶一点？

### 怎么构建自己的镜像

用别人的镜像固然爽，自己搓一个镜像到处都可以用才是真的爽。

如果你想把自己的应用交给别人使用，那就需要自己构建镜像。做法很简单：写一个叫 **Dockerfile** 的文件，把环境怎么准备、代码怎么放进去、最后程序怎么启动都写好。这样别人拿到这个目录，只需要在终端里执行：

```
docker build -t demo .
docker run demo
```

就能跑起来，不用再纠结环境配置。

下面是一个简化版本的dockerfile

```
FROM node:22.18.0-alpine

WORKDIR /app
COPY . . 
RUN npm ci --only=production
RUN mkdir -p /app/data /app/logs && chown -R node:node /app/data /app/logs

VOLUME ["/app/data", "/app/logs"]
EXPOSE 8080 8081
CMD ["npm", "run", "start"]
```

### 为什么需要 docker-compose

如果你的项目只有一个容器，比如一个简单的 web 服务，直接 `docker run` 就足够了。但要是像 AstrBot 这样，需要两个容器一起跑（一个是 napcat，一个是 astrbot），每次都要手动敲一长串命令，就显得又累又难维护。

这时候 **docker-compose** 就很有用了。你可以写一个 `yaml` 文件，把所有容器的配置放在一起。然后一条命令就能把整个应用拉起来，还能帮你处理容器之间的网络、卷、环境变量等等。

我简化了一下 AstrBot 的 `compose.yml`，核心内容大概是这样：

```
services:
  napcat:
    image: mlikiowa/napcat-docker:latest
    container_name: napcat
    ports:
      - "6099:6099"
    volumes:
      - ./data:/AstrBot/data
    networks:
      - astrbot_network
    restart: always

  astrbot:
    image: soulter/astrbot:latest
    container_name: astrbot
    ports:
      - "6185:6185"
    volumes:
      - ./data:/AstrBot/data
    networks:
      - astrbot_network
    restart: always

networks:
  astrbot_network:
    driver: bridge
```

简单说就是：定义了两个服务 napcat 和 astrbot，它们共享同一个网络，可以互相通信；各自有端口和卷的配置；掉线还能自动重启。  
然后运行：

```
docker compose -f ./compose/astrbot.yml up -d
```

整个系统就能跑起来。

用一张图来理解 napcat 和 astrbot 的关系：

![](https://cdn.nlark.com/yuque/__mermaid_v3/6995c8c7a3c05d071ab4cf849b85ef6d.svg)

两个容器都接入了同一个网络 `astrbot_network`，所以它们能直接互相通信。外部访问时则通过端口映射进入。

## 回顾：Docker究竟是个啥

**Docker容器是一个在宿主机内核上运行，拥有自己独立的文件系统环境，被隔离的进程**。

从**使用者**的角度讲： 直接用docker可以一键部署自己需要的应用，可以隔离各个应用，不至于相互干扰。可以使用简单的命令来实现对应用的管理。

从**开发者**的角度讲：通过docker来轻松实现软件的交付，不需要操心客户环境配置问题；可以通过docker compose来实现多个应用的协作。

从**我**的角度讲：借助docker可以完成一场近20min的分享，并畅享苏州一日游

docker可以实现什么？

- 项目交付和部署
- 解决环境依赖问题
- 版本迭代和发布

docker不适合做什么？

- 小型脚本 （增加复杂度）
- 持久化服务、有状态的服务

---

日志：

9/17 午 完成一个困扰许多人的问题

9/17晚 完成docker如何使用，完善docker如何工作

写起来好费时间，但是也算倒逼自己去了解原理

9月17日晚23.13，我宣布，第一版结束！

9月18日，修改部分内容

9月19日，cac在讲PBL，和我想象中的PBL不一样