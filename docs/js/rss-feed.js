/**
 * 朋友圈订阅页面JS
 * 仅解析和展示配置文件中的RSS订阅源（朋友圈），页面不支持增删
 */

(function() {
  'use strict';

  // 使用CORS代理来获取RSS（因为浏览器跨域限制）
  const CORS_PROXY = 'https://api.allorigins.win/get?url=';

  // 只从window.rssFeeds读取RSS源列表
  function getFeedList() {
    if (window.rssFeeds && window.rssFeeds.length > 0) {
      return window.rssFeeds;
    }
    // 可选：如找不到配置，返回一个空数组
    return [];
  }

  // 解析RSS XML
  function parseRSS(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('RSS解析失败: ' + parserError.textContent);
    }
    const items = xmlDoc.querySelectorAll('item');
    const feed = {
      title: xmlDoc.querySelector('title')?.textContent || '未知',
      link: xmlDoc.querySelector('link')?.textContent || '',
      description: xmlDoc.querySelector('description')?.textContent || '',
      items: []
    };

    items.forEach(item => {
      const title = item.querySelector('title')?.textContent || '无标题';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent ||
                      item.querySelector('date')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const author = item.querySelector('author')?.textContent ||
                     item.querySelector('dc\\:creator')?.textContent || '';

      feed.items.push({
        title,
        link,
        pubDate: formatDate(pubDate),
        description: cleanDescription(description),
        author
      });
    });

    return feed;
  }

  // 清理HTML描述，只保留文本
  function cleanDescription(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    let text = div.textContent || div.innerText || '';
    if (text.length > 200) {
      text = text.substring(0, 200) + '...';
    }
    return text;
  }

  // 格式化日期
  function formatDate(dateString) {
    if (!dateString) return '未知时间';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 60) {
        return `${minutes}分钟前`;
      } else if (hours < 24) {
        return `${hours}小时前`;
      } else if (days < 7) {
        return `${days}天前`;
      } else {
        return date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    } catch (e) {
      return dateString;
    }
  }

  // 获取RSS内容
  async function fetchFeed(feedUrl) {
    try {
      const proxyUrl = CORS_PROXY + encodeURIComponent(feedUrl);
      const response = await fetch(proxyUrl);
      const data = await response.json();
      if (data.status.http_code !== 200) {
        throw new Error('获取RSS失败');
      }
      return parseRSS(data.contents);
    } catch (error) {
      console.error('获取RSS时出错:', error);
      throw error;
    }
  }

  // 渲染单个RSS源（不再显示删除按钮）
  function renderFeed(feedData, feedConfig) {
    const feedElement = document.createElement('div');
    feedElement.className = 'rss-feed';
    feedElement.innerHTML = `
      <div class="feed-header">
        <div class="feed-info">
          <h3 class="feed-name">${feedConfig.name || feedData.title}</h3>
          ${feedConfig.description ? `<p class="feed-desc">${feedConfig.description}</p>` : ''}
          <a href="${feedData.link}" target="_blank" class="feed-link" rel="noopener">
            <i class="fas fa-external-link-alt"></i> 访问源网站
          </a>
        </div>
      </div>
      <div class="feed-posts">
        ${feedData.items.slice(0, 10).map(item => `
          <article class="feed-post-item">
            <a href="${item.link}" target="_blank" rel="noopener" class="post-link">
              <h4 class="post-title">${item.title}</h4>
              ${item.description ? `<p class="post-excerpt">${item.description}</p>` : ''}
              <div class="post-meta">
                <span class="post-date">
                  <i class="far fa-clock"></i> ${item.pubDate}
                </span>
                ${item.author ? `<span class="post-author"><i class="fas fa-user"></i> ${item.author}</span>` : ''}
              </div>
            </a>
          </article>
        `).join('')}
      </div>
    `;
    return feedElement;
  }

  // 渲染所有RSS源
  async function renderFeeds() {
    const container = document.getElementById('rss-feeds-container');
    const loading = document.getElementById('loading-spinner');
    const feedsList = document.getElementById('feeds-list');

    const feedConfigs = getFeedList();

    if (!feedConfigs || feedConfigs.length === 0) {
      feedsList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-inbox"></i>
          <p>还没有添加任何订阅源</p>
          <p class="empty-hint">请通过配置文件添加订阅源</p>
        </div>
      `;
      loading.style.display = 'none';
      return;
    }

    loading.style.display = 'flex';
    feedsList.innerHTML = '';

    try {
      const feedPromises = feedConfigs.map(async (feedConfig) => {
        try {
          const feedData = await fetchFeed(feedConfig.url);
          return { feedData, feedConfig, error: null };
        } catch (error) {
          return {
            feedData: null,
            feedConfig,
            error: error.message || '加载失败'
          };
        }
      });
      
      const results = await Promise.all(feedPromises);

      results.forEach(({ feedData, feedConfig, error }) => {
        if (error) {
          const errorElement = document.createElement('div');
          errorElement.className = 'rss-feed rss-error';
          errorElement.innerHTML = `
            <div class="feed-header">
              <div class="feed-info">
                <h3 class="feed-name">${feedConfig.name || feedConfig.url}</h3>
                <p class="error-message">
                  <i class="fas fa-exclamation-triangle"></i> ${error}
                </p>
              </div>
            </div>
          `;
          feedsList.appendChild(errorElement);
        } else {
          feedsList.appendChild(renderFeed(feedData, feedConfig));
        }
      });
    } catch (error) {
      console.error('渲染RSS时出错:', error);
    } finally {
      loading.style.display = 'none';
    }
  }

  // 初始化：移除页面添加/删除相关事件，仅渲染
  function init() {
    renderFeeds();
  }

  // 页面加载后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

