/**
 * 导航栏增强 - 延长模糊背景显示时间
 */
(function() {
  'use strict';

  let navFixedTimer = null;
  let lastScrollTop = 0;
  let scrollTimeout = null;

  function handleNavbarScroll() {
    const header = document.getElementById('page-header');
    if (!header) return;

    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // 清除之前的定时器
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    if (currentScrollTop > 56) {
      // 滚动超过56px时，立即添加nav-fixed（显示模糊背景）
      if (!header.classList.contains('nav-fixed')) {
        header.classList.add('nav-fixed');
        
        // 延迟2秒后才将文字颜色变为黑色
        if (navFixedTimer) {
          clearTimeout(navFixedTimer);
        }
        navFixedTimer = setTimeout(() => {
          header.classList.add('nav-text-dark');
        }, 2000);
      }
    } else {
      // 滚动回顶部时，移除nav-fixed
      if (header.classList.contains('nav-fixed')) {
        // 延迟3秒后才移除nav-fixed（延长显示时间）
        scrollTimeout = setTimeout(() => {
          header.classList.remove('nav-fixed', 'nav-text-dark');
          if (navFixedTimer) {
            clearTimeout(navFixedTimer);
            navFixedTimer = null;
          }
        }, 3000);
      }
    }
    
    lastScrollTop = currentScrollTop;
  }

  // 使用节流优化性能
  function throttle(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener('scroll', throttle(handleNavbarScroll, 100), { passive: true });
    });
  } else {
    window.addEventListener('scroll', throttle(handleNavbarScroll, 100), { passive: true });
  }
})();

