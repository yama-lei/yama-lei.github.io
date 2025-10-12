---
title: ICS开发指南
date: 2025-10-04 15:21:40
categories:
  - NJUCS
  - ICS计算系统基础
article: false
---
南大的NEMU在网上已经有了很多的教程，并且也有了官方的答疑ai，但无论是直接从网上搜索答案还是让ai直接生成给出solution，解决的都是**答案是什么的问题**。至于怎么**自己解决问题**，依赖的更多是教学网站上的tutorial。但值得一提的是，有的时候，官方的tutorial不一定100%适合所有的学生。在本文中，我会尽可能地把我在完成ICS PA过程中遇见的困难和学到的一些技巧记录下来，希望能帮助到你！
<!--more-->
## 开发环境和工具
在写ICS的PA的时候，对于调试真的很抓狂，但是gdb又不是很熟悉。这里给出使用vscode来实现icspa快速开发的方案，以及PA作业过程中需要补充的知识点。
### Linux环境配置
**选择一个linux发行版和编程环境**
推荐使用ubuntu linux作为开发环境，~~因为大家都用这个~~。
- 对于windows用户推荐使用wsl，配置简单，和windows集成好。
- 可以购置迷你主机，在主机中安装linux系统，顺带还可以作为自己的服务器
- 可以购置2H2G的云服务器
- 有的班级会有虚拟机资源
- 喜欢折腾可以在树莓派，RadxaPi等开发板上开发
其中，除了wsl2外，均需要使用ssh连接（开发时建议使用vscode的remote ssh远程开发插件）
**配置自己喜欢的东西**
1. 好用的shell，比如zsh
2. 安装必要的包
3. 简单配置vim
4. （Optional）配置kawaii-gcc让编程更带劲
### 插件
**WSL/Remote SSH**
远程开发所需插件
**C/C++语言相关包**
不在这里赘述
**ToDoTree**
将项目中标注了TODO、FIXME、WARNING等等地方作为标记，能够快速定位代码
**Copilot**
需要学生认证

### 调试

使用vscode调试比在命令行使用gdb不知道要香多少，在我看来至少有下面这些优点：
- 快速了解代码之间的关系。在调试的时候，可以用肉眼亲自看见执行的语句是怎么一步步从main函数到engine_start(),然后sdb_loop()的，比阅读手册来得快。调用堆栈明明白白。
- 提升对vscode调试的熟练度。我认为，无论是在学术界还是工业界，有vscode用的人，不会傻乎乎地选择vim（至少对于相当多“新人”来讲是这样），现代化的工具链替代vim和原生gdb肯定是有一定道理的。
但也有cons：
- 不利于了解底层（可能）
不过对于初学者和目标是survive的同学来说，vscode调试确实爽，vscode写代码确实爽。
---
使用vscode调试代码方法：
	1. 运行 `make -n`,`make run -n`,`make gdb -n`，分别查看究竟在运行什么内容
	2. 将上述内容复制并ASK GPT，在GPT的指导下，配置好`task.json`和`launch.json`
	3. 开始你的快乐调试之旅
也可以直接尝试我的版本：
（task.json)
```task.json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build NEMU (make)",
            "type": "shell",
            "command": "make",
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "problemMatcher": [
                "$gcc"
            ],
            "detail": "Compiles the NEMU project before debugging."
        }
    ]
}
```
(launch.json)
```launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "NEMU GDB Debug (VS Code) 🚀",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/build/riscv32-nemu-interpreter",
            "args": [
                "--log=${workspaceFolder}/build/nemu-log.txt"
            ],
            "stopAtEntry": true, // 启动后停在 main 函数
            "cwd": "${workspaceFolder}",
            "MIMode": "gdb",
            "miDebuggerPath": "/usr/bin/gdb", // GDB 路径
            "preLaunchTask": "Build NEMU (make)" // 调试前先执行编译任务
        }
    ]
}
```
**更好的方案：将`{workspaceFolder}`替换为`${env:NEMU_HOME}`**，后者正是在PA0里面要求在shell里面设置的环境变量。




## 需要补的知识
我的成绩位列专业前游，但是编程基础极差（就我观察来看，我这样编程能力差的人也不少），因此有必要多研究研究下面的知识。

#### C语言拾遗

**字符串操作**

**文件IO**

#### 程序的编译&&Make工具链
make是如何将各个文件联系起来的

#### Linux基础

**Vim**

**Tmux**

**命令行工具**
- tldr
- grep
- ps aux
- netstat

#### **其他知识**
**正则表达式**
- 学习网站：[Regex Learn - 正则表达式交互式课程](https://regexlearn.com/zh-cn/learn)
- 测试网站：[regex101: build, test, and debug regex](https://regex101.com/)

