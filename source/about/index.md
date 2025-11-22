---
layout: page
comments: true
sidebar: true
title: 关于
date: 2025-11-01
---

<div class="about-page">

## 👋 你好，我是 Yama

一名 **NJU CS** (南京大学计算机科学与技术) 在读学生，热爱编程，喜欢探索新技术。

---

### 🎓 教育背景

- **南京大学** · 计算机科学与技术
- 专注于系统编程、人工智能等领域的学习

---

### 💻 技术栈

<div class="tech-stack">

**编程语言**
- Python, C/C++, JavaScript, TypeScript

**框架 & 工具**
- PyTorch, TensorFlow
- Node.js, React
- Git, Docker

**研究方向**
- 计算机视觉
- 自然语言处理
- 系统编程

</div>

---

### 📚 关于这个博客

这个博客是我的 **知识花园** 🌱，用于记录：

- 📖 课程笔记和学习心得
- 💡 技术探索和项目实践
- 🤔 生活感悟和随笔碎碎念
- 📝 研究记录和论文阅读

> 博客使用 Hexo + Butterfly 主题搭建，采用 Obsidian + Templater 工作流编写文章。

---

### 🔗 找到我

<div class="social-links">

- 💼 [GitHub](https://github.com/yama-lei)
- 📧 Email: your@email.com
- 📚 [知乎](#)
- 🎮 [Bilibili](#)

</div>

---

### 📊 博客统计

<div id="site-stats" class="site-stats">
  <!-- Stats will be injected by JavaScript -->
</div>

---

### 💬 留言板

欢迎在下方留言，分享你的想法或建议！👇

</div>

<style>
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-6);
}

.about-page h2 {
  margin-top: var(--space-10);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--brand-primary);
}

.tech-stack {
  display: grid;
  gap: var(--space-6);
  margin: var(--space-6) 0;
}

.tech-stack strong {
  display: block;
  font-size: var(--font-size-lg);
  color: var(--brand-primary);
  margin-bottom: var(--space-3);
}

.tech-stack ul {
  list-style: none;
  padding: 0;
}

.tech-stack li {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  margin: var(--space-1);
  background: var(--brand-gradient-light);
  color: var(--text-primary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  border: 1px solid var(--brand-primary);
  transition: all var(--transition-fast);
}

.tech-stack li:hover {
  background: var(--brand-gradient);
  color: var(--text-inverse);
  transform: translateY(-2px);
}

.social-links a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  margin: var(--space-2);
  background: var(--card-bg);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  text-decoration: none;
  transition: all var(--transition-base);
}

.social-links a:hover {
  background: var(--brand-primary);
  color: var(--text-inverse);
  border-color: var(--brand-primary);
  transform: translateY(-3px);
  box-shadow: var(--card-shadow-hover);
}

.site-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-4);
  margin: var(--space-6) 0;
}

.stat-box {
  padding: var(--space-5);
  background: var(--card-bg);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all var(--transition-base);
}

.stat-box:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow-hover);
  border-color: var(--brand-primary);
}

.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--brand-primary);
  margin-bottom: var(--space-2);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em);
}

@media (max-width: 768px) {
  .about-page {
    padding: var(--space-4);
  }
  
  .tech-stack {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
  }
}
</style>

<script>
// Add site stats
(function() {
  const statsContainer = document.getElementById('site-stats');
  if (!statsContainer) return;
  
  const stats = [
    { value: '133+', label: '文章总数' },
    { value: '8+', label: '分类' },
    { value: '300+', label: '运行天数' },
    { value: '♾️', label: '持续更新' }
  ];
  
  stats.forEach(stat => {
    const box = document.createElement('div');
    box.className = 'stat-box';
    box.innerHTML = `
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    `;
    statsContainer.appendChild(box);
  });
})();
</script>