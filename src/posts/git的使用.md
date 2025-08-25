---
date: 2025-01-13
star: true
title: github入门--the missing class for cs learner
---



## git基本使用Quick Start
 ![](https://www.runoob.com/wp-content/uploads/2015/02/git-command.jpg)

 ### 安装与初始化
 从官网下载git，之后从终端中输入下面两条指令，设置名字和邮箱
 ```
 git config --global "name"
 git config --global "email"
 ```
 **注意: name 和 Email 是用英文双引号包裹起来的**
### 初始化一个仓库
1.从零开始：在你想要创建项目的地方打开终端，输入git init
```
git init //从头开始

```

2.直接clone别人的仓库：在目标文件夹打开终端，使用git clone +仓库名
```
git clone https://github.com/yama-lei/yama-lei.github.io.git  `
```
这里的url可以直接点开仓库右上角的绿色“code”按钮，下面可以直接复制

### 连接远程仓库
命令行中输入：
```
git remote add origin https://github.com/yama-lei/yama-lei.github.io.git
```
第一次连接需要配置SSH key
```
ssh-keygen -t rsa -b 4096 -C "github 注册账号"
```
接下来按照提示，保存SSH key，设置密码（也可以不设置）。
依次执行：
```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub
```
就会在终端中输出ssh-rsa开头的SSH key,复制这段输出。
github->点开头像->出现的侧边栏中间有个setting->点开后会进入到设置，找到"SSH and GPG keys"->在SSH key右侧有个绿色按钮“Add SSh ey”

### 如何更新远程的仓库？
在本地修改了文件后，可以直接“一键三连”
```
git add .
git commit
git push origin main
```
在这里三个指令分别代表了三个操作：
#### 1. 将文件添加到暂存区(staging area)
如果只修改/添加某个文件，可以使用
```
git add filename
```
指定那个名叫‘filename’的文件
如果嫌麻烦，直接
```
git add .
```
但是请注意！！！ add后面有个点' . '
#### 2. 将暂存区的文件提交到本地仓库
使用指令：
```
git commit
```
如果想要在提交的时候，备注上更新什么内容，可以用下面这个
```
git commit -m "本次更新解决了提出bug的用户"
```
加上这个备注 ，有助于清晰地了解各个版本修改的内容，如果出现了什么问题，可以回溯之前的版本，提高了是错成本，避免因为某处错误而导致整个项目崩溃。
#### 3. 将本地仓库的文件提交到远程仓库（即上文中连接的github仓库）
将本地仓库里的内容push到远程仓库的xx分支（如果没有特殊改变分支，一般是main分支）
```
git push origin branchname
```
### 如何回溯过往版本？
#### 1.查询提交记录
使用git log来获取到提交记录,下面是我某一次博客的部分修改日志
输入
```
git log
```
输出：
```
commit adf721c24faa3f355468ae5400fd63f6f193a942 (HEAD -> main, origin/main)
Author: yama-lei <1908777046@qq.com>
Date:   Thu Jan 16 10:39:33 2025 +0800

    add a new game: 2048

commit 7933b8b303b170ab0cf360ce4d5e3f8de37b972d
Author: yama-lei <1908777046@qq.com>
Date:   Wed Jan 15 15:41:58 2025 +0800

    add mores blogs and created some new demos
```
可以看到，日志的内容呈现倒叙：最后提交的内容在最上面。
每一次的提交都会有commit、Author、Date
commit是这一次提交的唯一标识。
Author是前文设置的name和email，date为日期。

#### 2.切换到历史提交记录
运行
```
git checkout commit
```
可以回到原先某一次（由对应commit决定）的状态。
再把commit换成main即可回到原先的main分支
```
git checkout main
```
#### 3. 恢复历史记录
将某次历史记录保存在暂存区：
```
git reset --soft commit
```
将历史记录彻底覆盖
```
git reset --hard commit
```
> 这里的commit说的都是前文提到过的唯一标识

#### 4.切换分支
列出所有的分支
```
git branch
```
创建并进入某个新分支
```
git checkout -b branchname
```
合并分支(将名为'branchname'的分支合并到main分支)
```
git merge branchname
```
删除分支
```
git branch -d branchname
```

### 5.如何merge代码？

```bash
git fetch origin //拉取
git merge origin/main //将代码和本地的进行合并
```

<video width="320" height="240" controls>
  <source src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/202503011711518.mp4" type="video/mp4">
</video>



### fork别的仓库

下面是deepseek对于fork的描述：

-   Fork 的仓库是你的独立副本，修改不会影响原仓库。

-   Fork 的仓库**不会自动同步**原仓库的更新，需要手动同步。
-   你可以通过命令行或网页端将原仓库的更新同步到你的 Fork 仓库。
-   如果你想贡献代码，可以通过 Pull Request 提交更改。

## github page

github提供了部署静态网页相对简单的一个方案--github page

## github action

github action是一个工作流(workflow)
