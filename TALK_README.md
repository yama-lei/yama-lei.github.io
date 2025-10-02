# 说说功能使用说明

## 📝 如何添加说说

在 `source/_posts/talk/` 目录下创建新的 Markdown 文件，例如 `my-talk.md`：

```markdown
---
title: 说说标题（可选，默认为"无标题"）
date: 2025-10-01 12:00:00
tags:
  - 标签1
  - 标签2
categories:
  - talk
image: 图片URL（可选）
link: 相关链接（可选）
---

这里写你的说说内容...
支持 Markdown 格式！
```

## ⚙️ 工作原理

1. **自动隐藏**: `scripts/hide-talk-posts.js` 会自动将 talk 文件夹中的文章设置为 `published: false`，这样它们不会出现在：
   - 首页文章列表
   - 归档页面
   - 分类页面
   - 标签页面
   - 搜索结果

2. **动态加载**: `scripts/generate-talks.js` 提供了一个 Hexo helper 函数 `get_talks()`，它会：
   - 直接从文件系统读取 talk 文件夹中的所有 `.md` 文件
   - 解析 front-matter 和内容
   - 按日期排序（最新的在前）
   - 返回 JSON 数据供说说页面使用

3. **独立展示**: 说说内容只在 `/essay/` 页面中显示，采用卡片式布局

## 🎨 字段说明

- `title`: 说说标题，如果不设置会显示"无标题"
- `date`: 发布日期，格式为 `YYYY-MM-DD HH:mm:ss`
- `tags`: 标签数组，可选
- `categories`: 必须包含 `talk`，用于标识这是说说
- `image`: 图片URL，可选，会在说说卡片中显示
- `link`: 相关链接，可选，会在卡片底部显示"查看详情"按钮

## 🔧 重新生成

修改说说后，运行：

```bash
hexo clean
hexo generate
hexo server
```

访问 `/essay/` 查看效果！

## ⚠️ 注意事项

1. 说说文件必须放在 `source/_posts/talk/` 目录下
2. 文件名可以任意，但建议使用有意义的英文名称
3. 确保 front-matter 格式正确（使用 `---` 包围）
4. categories 必须包含 `talk`
5. 不要删除 `scripts/generate-talks.js` 和 `scripts/hide-talk-posts.js` 文件

