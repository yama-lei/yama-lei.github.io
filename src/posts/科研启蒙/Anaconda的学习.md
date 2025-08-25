---
title: 学习Anaconda
---

声明：下面这些东西基本来自<a href="[Anaconda 教程 | 菜鸟教程](https://www.runoob.com/python-qt/anaconda-tutorial.html)">菜鸟教程</a>

## Anaconda是什么

Anaconda 是一个数据科学和机器学习的软件套装，它包含了许多工具和库，让您能够更轻松地进行编程、分析数据和构建机器学习模型。

Anaconda 包及其依赖项和环境的管理工具为 **conda** 命令，文章后面部分会详细介绍。

与传统的 **Python pip** 工具相比 Anaconda 的**conda** 可以更方便地在不同环境之间进行切换，环境管理较为简单。

即**环境的管理工具**

## 使用Anaconda

1.   Anconda prompt 进行命令行操作
2.   Anaconda navigator进行gui操作

## Anaconda指令

以下是一些常用的Conda命令及其简要介绍：

### 环境管理

**创建一个名为 "myenv" 的新环境:**

```
conda create --name myenv
```

**创建指定版本的环境**：

```
conda create --name myenv python=3.8
```

以上代码创建一个名为 "myenv" 的新环境，并指定 Python 版本为 3.8。

**激活环境：**

```
conda activate myenv
```

以上代码激活名为 "myenv" 的环境。

**要退出当前环境使用以下命令：**

```
conda deactivate  
```

**查看所有环境：**

```
conda env list
```

以上代码查看所有已创建的环境。

**复制环境：**

```
conda create --name myclone --clone myenv
```

以上代码通过克隆已有环境创建新环境。

**删除环境：**

```
conda env remove --name myenv
```

以上代码删除名为 "myenv" 的环境。

### 包管理

**安装包：**

```
conda install package_name
```

以上代码安装名为 "package_name" 的软件包。

**安装指定版本的包：**

```
conda install package_name=1.2.3
```

以上代码安装 "package_name" 的指定版本。

**更新包：**

```
conda update package_name
```

以上代码更新已安装的软件包。

**卸载包：**

```
conda remove package_name
```

以上代码卸载已安装的软件包。

**查看已安装的包：**

```
conda list
```

查看当前环境下已安装的所有软件包及其版本。

### 其他常用命令

**查看帮助：**

```
conda --help
```

以上代码获取 conda 命令的帮助信息。

**查看 conda 版本：**

```
conda --version
```

以上代码查看安装的 conda 版本。

**搜索包：**

```
conda search package_name
```

以上代码在 conda 仓库中搜索指定的软件包。

**清理不再需要的包：**

```
conda clean --all
```

以上代码清理 conda 缓存，删除不再需要的软件包。

### Jupyter Notebook（可选）

**安装 Jupyter Notebook：**

```
conda install jupyter
```

以上代码安装 Jupyter Notebook。

**启动 Jupyter Notebook：**

```
jupyter notebook
```

以上代码在已激活的环境中启动 Jupyter Notebook。

## pip 相关的指令

**安装需要项目中所需要的包**

```
pip install -r requirement.txt
```

**安装某一个包**

```
pip install package_name
```

由于pip的源在国外，如果加载太久会自己停止下载，但是可以强制pip进行下载，在原先指令的后面加上--timeout 6000，强制在600s的时候才报timeout错误如

```
pip install package_name --timeout 6000
```

**也可以换到国内的pip源进行下载**

## Jupyter 和 ipynb

Jupyter是一种编辑器，ipynb是其对应的一中文件类型。

ipynb是以一种将py和md结合在一起的文件形式，也可以装换成其他类型的格式（纯md，html，py等）
