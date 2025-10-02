// Enhanced Footer with Navigation Links
(function() {
  function addFooterNav() {
    const footer = document.querySelector('#footer');
    if (!footer) return;
    
    // Check if already added
    if (document.querySelector('.custom-footer-nav')) return;
    
    const navData = [
      { name: '首页', url: '/', icon: 'fas fa-home' },
      { name: '归档', url: '/archives/', icon: 'fas fa-archive' },
      { name: '分类', url: '/categories/', icon: 'fas fa-list' },
      { name: '标签', url: '/tags/', icon: 'fas fa-tags' },
      { name: '说说', url: '/essay/', icon: 'fas fa-comment-dots' },
      { name: '友链', url: '/links/', icon: 'fas fa-user-friends' },
      { name: 'Playground', url: '/playground/', icon: 'fas fa-flask' }
    ];
    
    const navHTML = `
      <div class="custom-footer-nav">
        <div class="footer-nav-title">快速导航</div>
        <div class="footer-nav-links">
          ${navData.map(item => `
            <a href="${item.url}" class="footer-nav-link">
              <i class="${item.icon}"></i>
              <span>${item.name}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
    
    // Insert before .footer-other
    const footerOther = footer.querySelector('.footer-other');
    if (footerOther) {
      footerOther.insertAdjacentHTML('beforebegin', navHTML);
    } else {
      footer.insertAdjacentHTML('afterbegin', navHTML);
    }
  }
  
  // Run after DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addFooterNav);
  } else {
    addFooterNav();
  }
})();

