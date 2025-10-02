---
layout: page
title: 说说
comments: false
sidebar: true
type: essay
---

<div id="talks-container" class="talks-wrapper">
  <div class="talks-header">
    <h2 class="talks-title">生活碎碎念</h2>
    <p class="talks-subtitle">记录生活的点点滴滴</p>
  </div>
  <div id="talks-list" class="talks-list">
    <div class="loading">加载中...</div>
  </div>
</div>

<script>
console.log('[Talks Page] Script started');
let talksData = [];

// 从生成的 JSON 文件加载数据
fetch('/talks.json')
  .then(response => {
    console.log('[Talks Page] Fetch response status:', response.status);
    if (!response.ok) {
      throw new Error('Failed to load talks.json: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log('[Talks Page] Loaded data:', data);
    talksData = data || [];
    if (talksData.length > 0) {
      console.log('[Talks Page] Found', talksData.length, 'talks');
      renderTalks();
    } else {
      console.log('[Talks Page] No talks found in data');
      showNoTalks();
    }
  })
  .catch(err => {
    console.error('[Talks Page] Error loading talks:', err);
    showNoTalks('加载失败: ' + err.message);
  });

function showNoTalks(message) {
  const container = document.getElementById('talks-list');
  const msg = message || '暂无说说内容';
  container.innerHTML = `<div class="no-talks">${msg}<br><small>请在 source/_posts/talk/ 目录下添加 .md 文件</small></div>`;
}

function renderTalks() {
  console.log('[Talks Page] renderTalks called');
  const container = document.getElementById('talks-list');
  
  if (!talksData || talksData.length === 0) {
    console.log('[Talks Page] No talks data');
    showNoTalks();
    return;
  }
  
  const html = talksData.map((talk, index) => {
    console.log('[Talks Page] Rendering talk:', talk.title);
    
    const date = new Date(talk.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // 处理图片
    const imageHtml = (talk.image && talk.image.trim() !== '') ? `
      <div class="talk-image">
        <img src="${talk.image}" alt="${talk.title}" loading="lazy">
      </div>
    ` : '';
    
    // 处理标签
    const tagsHtml = (talk.tags && Array.isArray(talk.tags) && talk.tags.length > 0) ? `
      <div class="talk-tags">
        ${talk.tags.map(tag => `<span class="talk-tag">${tag}</span>`).join('')}
      </div>
    ` : '';
    
    // 处理链接
    const linkHtml = (talk.link && talk.link.trim() !== '') ? `
      <a href="${talk.link}" class="talk-link">查看详情 →</a>
    ` : '';
    
    return `
      <article class="talk-item" style="animation-delay: ${index * 0.1}s">
        <div class="talk-date-badge">
          <span class="talk-day">${day}</span>
          <span class="talk-month">${month}/${year}</span>
        </div>
        <div class="talk-content">
          <h3 class="talk-title">${talk.title}</h3>
          <div class="talk-text">${talk.content}</div>
          ${imageHtml}
          <div class="talk-footer">
            ${tagsHtml}
            ${linkHtml}
          </div>
        </div>
      </article>
    `;
  }).join('');
  
  console.log('[Talks Page] HTML generated, setting innerHTML');
  container.innerHTML = html;
  console.log('[Talks Page] Rendering complete');
}
</script>

<style>
.talks-wrapper {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.talks-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.talks-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.talks-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

.talks-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.loading, .no-talks {
  text-align: center;
  padding: 3rem;
  color: #868e96;
  font-size: 1.1rem;
}

.no-talks small {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.7;
}

.talk-item {
  display: flex;
  gap: 1.5rem;
  opacity: 0;
  animation: talkFadeIn 0.6s ease forwards;
}

@keyframes talkFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.talk-date-badge {
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.talk-day {
  font-size: 1.5rem;
  font-weight: 700;
  color: #495057;
  line-height: 1;
}

.talk-month {
  font-size: 0.75rem;
  color: #868e96;
  margin-top: 4px;
}

.talk-content {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.talk-content:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-color: #adb5bd;
}

.talk-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.talk-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #495057;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.talk-image {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
}

.talk-image img {
  width: 100%;
  max-width: 500px;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.talk-image img:hover {
  transform: scale(1.02);
}

.talk-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f3f5;
}

.talk-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.talk-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #f8f9fa;
  color: #495057;
  font-size: 0.875rem;
  border-radius: 16px;
  border: 1px solid #e9ecef;
}

.talk-link {
  color: #495057;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.talk-link:hover {
  color: #212529;
  background: #f8f9fa;
}

@media (max-width: 768px) {
  .talks-wrapper {
    padding: 1rem 0.5rem;
  }
  
  .talks-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }
  
  .talks-title {
    font-size: 1.5rem;
  }
  
  .talk-item {
    gap: 1rem;
  }
  
  .talk-date-badge {
    width: 60px;
    height: 60px;
  }
  
  .talk-day {
    font-size: 1.25rem;
  }
  
  .talk-month {
    font-size: 0.7rem;
  }
  
  .talk-content {
    padding: 1rem;
  }
  
  .talk-title {
    font-size: 1.1rem;
  }
  
  .talk-text {
    font-size: 0.95rem;
  }
  
  .talk-footer {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
}
</style>
