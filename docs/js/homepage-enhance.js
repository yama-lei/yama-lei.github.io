// ============================================
// Homepage Enhancements
// Parallax, Animations, Stats Cards, Bing API
// ============================================

(function() {
  // Only run on homepage
  if (!document.querySelector('#page-header.full_page')) return;
  
  // Fetch Bing daily image
  function loadBingDailyImage() {
    const pageHeader = document.querySelector('#page-header.full_page');
    if (!pageHeader) return;
    
    fetch('https://bing.biturl.top/')
      .then(response => response.json())
      .then(data => {
        // Set the background image from the API response
        if (data && data.url) {
          const bgElement = document.createElement('style');
          bgElement.textContent = `
            #page-header.full_page::before {
              background-image: url('${data.url}') !important;
            }
          `;
          document.head.appendChild(bgElement);
          
          // Optional: Log copyright info to console
          if (data.copyright) {
            console.log('🖼️ Bing Daily Image:', data.copyright);
          }
        }
      })
      .catch(error => {
        console.error('Failed to load Bing daily image:', error);
        // Fallback to a default gradient
        const bgElement = document.createElement('style');
        bgElement.textContent = `
          #page-header.full_page::before {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
        `;
        document.head.appendChild(bgElement);
      });
  }
  
  // Parallax scrolling effect
  function initParallax() {
    const pageHeader = document.querySelector('#page-header.full_page');
    const siteInfo = document.querySelector('#page-header.full_page #site-info');
    if (!pageHeader) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const headerHeight = pageHeader.offsetHeight;
      
      // Only apply parallax when header is visible
      if (scrolled < headerHeight) {
        const opacity = 1 - (scrolled / headerHeight) * 0.8;
        
        // Move background slower than scroll (parallax effect)
        if (window.innerWidth > 768) {
          pageHeader.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
        
        // Fade out site info as user scrolls (keep centered position)
        if (siteInfo) {
          siteInfo.style.opacity = opacity;
          // Don't override the transform: translate(-50%, -50%) from CSS
        }
      }
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }
  
  
  // Add particle overlay
  function addParticleOverlay() {
    const pageHeader = document.querySelector('#page-header.full_page');
    if (!pageHeader || document.querySelector('.particle-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'particle-overlay';
    pageHeader.appendChild(overlay);
  }

  
  // Animate elements on scroll
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe post cards
    const postCards = document.querySelectorAll('.recent-post-item');
    postCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  }
  
  // Mouse move effect disabled - interferes with site-info positioning
  function initMouseEffect() {
    // Disabled to maintain centered title/subtitle
    return;
  }
  
  // Initialize all enhancements
  function init() {
    loadBingDailyImage(); // Load Bing image first
    addParticleOverlay();
    initParallax();
    initScrollAnimations();
    initMouseEffect();
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

