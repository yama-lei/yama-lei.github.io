// Homepage enhancements
(function() {
  // Only run on homepage
  if (!document.querySelector('#page-header.full_page')) return;
  
  // Add scroll down indicator
  function addScrollIndicator() {
    const pageHeader = document.querySelector('#page-header.full_page');
    if (!pageHeader || document.querySelector('.scroll-down')) return;
    
    const scrollDown = document.createElement('div');
    scrollDown.className = 'scroll-down';
    scrollDown.innerHTML = '<i class="fas fa-chevron-down"></i>';
    scrollDown.title = '向下滚动';
    
    scrollDown.addEventListener('click', () => {
      const content = document.querySelector('#content-inner');
      if (content) {
        content.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    pageHeader.appendChild(scrollDown);
  }
  
  // Add particle overlay
  function addParticleOverlay() {
    const pageHeader = document.querySelector('#page-header.full_page');
    if (!pageHeader || document.querySelector('.particle-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'particle-overlay';
    pageHeader.appendChild(overlay);
  }
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addScrollIndicator();
      addParticleOverlay();
    });
  } else {
    addScrollIndicator();
    addParticleOverlay();
  }
})();

