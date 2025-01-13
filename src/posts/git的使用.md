![](https://www.runoob.com/wp-content/uploads/2015/02/git-process.png)



## git操作命令行：

1.   git clone + github仓库网址, 

```cmd
 git clone https://github.com/username/repo.git 
```

2.   git init : 初始化一个新的仓库

```cmd
git init
```


3. git add <file>

```cmd
git add filename
```

4. git add . 修改全部文件

```cmd
git add .
```

# 修改文件如何上传？

### 1. **修改本地文件**

首先，在你的本地计算机上进行修改。例如，编辑 Markdown 文件、添加新内容、修改博客页面等。

### 2. **检查文件状态**

在命令行中运行以下命令查看哪些文件被修改或添加了：

```bash
git status
```

### 3. **添加修改的文件**

将你修改或新增的文件添加到暂存区：

```bash
git add <文件名>
```

如果你想添加所有更改的文件，可以使用：

```bash
git add .
```

### 4. **提交修改**

提交这些修改到本地 Git 仓库：

```bash
git commit -m "描述你的修改"
```

例如：

```bash
git commit -m "更新了首页内容和添加了新的博客文章"
```

### 5. **推送到 GitHub**

将本地的更改推送到 GitHub 上的 `main` 分支（或者你选择的其他分支）：

```bash
git push origin main
```

### 6. **GitHub Actions 部署**

如果你已经配置了 GitHub Actions（比如在 `.github/workflows` 下的 `deploy-docs.yml`），每次推送代码后，GitHub Actions 会自动构建和部署你的博客到 GitHub Pages。

### 7. **查看更新**

访问你的 GitHub Pages URL（例如：`https://yama-lei.github.io`），你可以看到你刚刚推送的更新。

### 小提示：

-   **分支管理：** 如果你正在进行较大的更改，建议在创建新功能或大更新之前创建一个新的分支，这样可以保证 `main` 分支始终保持稳定。

    创建新分支并切换到该分支：

    ```bash
    git checkout -b new-feature
    ```

    提交更改后，再将其合并回 `main` 分支：

    ```bash
    git checkout main
    git merge new-feature
    ```
-   **定期提交：** 避免一次性提交大量修改，尽量保持每次提交都包含较小的功能更新，这样更易于管理和追踪项目的历史。



