// ============================================
// Reading Experience Enhancements
// TOC active detection, heading anchors, table sorting, image zoom
// ============================================

(function() {
  'use strict';
  
  // ==================== TOC Active Section Highlighting ====================
  function initTocActiveDetection() {
    const toc = document.querySelector('#card-toc');
    if (!toc) return;
    
    const tocLinks = toc.querySelectorAll('.toc-link');
    const headings = Array.from(document.querySelectorAll(
      '#post h1[id], #post h2[id], #post h3[id], #post h4[id]'
    ));
    
    if (headings.length === 0) return;
    
    const observerOptions = {
      rootMargin: `-${document.querySelector('#page-header')?.offsetHeight || 60}px 0px -66% 0px`,
      threshold: 0
    };
    
    let currentActiveId = null;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentActiveId = entry.target.id;
          
          // Remove all active classes
          tocLinks.forEach(link => link.classList.remove('active', 'is-active-link'));
          
          // Add active class to current heading's TOC link
          const activeLink = toc.querySelector(`a[href="#${currentActiveId}"]`);
          if (activeLink) {
            activeLink.classList.add('active', 'is-active-link');
            
            // Scroll TOC to show active link
            activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      });
    }, observerOptions);
    
    headings.forEach(heading => observer.observe(heading));
  }
  
  // ==================== Heading Anchor Links ====================
  function initHeadingAnchors() {
    const post = document.querySelector('#post') || document.querySelector('#page');
    if (!post) return;
    
    const headings = post.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    
    headings.forEach(heading => {
      if (!heading.querySelector('.header-link')) {
        const anchor = document.createElement('a');
        anchor.className = 'header-link';
        anchor.href = `#${heading.id}`;
        anchor.setAttribute('aria-label', `链接到 ${heading.textContent}`);
        anchor.title = '复制链接';
        
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const url = `${window.location.origin}${window.location.pathname}#${heading.id}`;
          
          // Copy to clipboard
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
              showToast('链接已复制', 'success');
            }).catch(() => {
              // Fallback
              copyToClipboardFallback(url);
            });
          } else {
            copyToClipboardFallback(url);
          }
          
          // Update URL
          history.pushState(null, null, `#${heading.id}`);
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        heading.insertBefore(anchor, heading.firstChild);
      }
    });
  }
  

  
  // ==================== Table Enhancements ====================
  function initTableEnhancements() {
    const tables = document.querySelectorAll('#post table, #page table');
    
    tables.forEach(table => {
      // Wrap table for responsive scrolling
      if (!table.parentElement.classList.contains('table-wrap')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrap';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
      
      // Add sortable functionality to headers
      const headers = table.querySelectorAll('thead th');
      if (headers.length === 0) return;
      
      headers.forEach((header, index) => {
        header.classList.add('sortable');
        header.style.cursor = 'pointer';
        header.setAttribute('data-column', index);
        
        header.addEventListener('click', () => {
          sortTable(table, index, header);
        });
      });
    });
  }
  
  function sortTable(table, columnIndex, header) {
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const currentOrder = header.classList.contains('asc') ? 'asc' : 'desc';
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    
    // Remove all sort classes from headers
    table.querySelectorAll('thead th').forEach(th => {
      th.classList.remove('asc', 'desc');
    });
    
    // Add new sort class
    header.classList.add(newOrder);
    
    // Sort rows
    rows.sort((a, b) => {
      const aCell = a.cells[columnIndex]?.textContent.trim() || '';
      const bCell = b.cells[columnIndex]?.textContent.trim() || '';
      
      // Try to parse as number
      const aNum = parseFloat(aCell);
      const bNum = parseFloat(bCell);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return newOrder === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      // String comparison
      return newOrder === 'asc' 
        ? aCell.localeCompare(bCell, 'zh-CN')
        : bCell.localeCompare(aCell, 'zh-CN');
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
  }
  
  // ==================== Image Lazy Load & Zoom ====================
  function initImageEnhancements() {
    const images = document.querySelectorAll('#post img, #page img');
    
    images.forEach(img => {
      // Add loading attribute
      img.loading = 'lazy';
      
      // Add zoom functionality
      img.addEventListener('click', () => {
        if (img.classList.contains('no-zoom')) return;
        
        const lightbox = createLightbox(img.src, img.alt);
        document.body.appendChild(lightbox);
        
        // Animate in
        requestAnimationFrame(() => {
          lightbox.style.opacity = '1';
          lightbox.querySelector('.lightbox-image').style.transform = 'scale(1)';
        });
      });
      
      // Change cursor
      if (!img.classList.contains('no-zoom')) {
        img.style.cursor = 'zoom-in';
      }
    });
  }
  
  function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
      cursor: zoom-out;
    `;
    
    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.src = src;
    img.alt = alt || '';
    img.style.cssText = `
      max-width: 90%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      transform: scale(0.9);
      transition: transform 0.3s ease;
    `;
    
    lightbox.appendChild(img);
    
    // Close on click
    lightbox.addEventListener('click', () => {
      lightbox.style.opacity = '0';
      img.style.transform = 'scale(0.9)';
      setTimeout(() => lightbox.remove(), 300);
    });
    
    // Close on escape
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        lightbox.click();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
    
    return lightbox;
  }
  
  // ==================== Smooth Scroll for Anchor Links ====================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = document.querySelector('#page-header')?.offsetHeight || 60;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL
          history.pushState(null, null, href);
        }
      });
    });
  }
  
  // ==================== Helper Functions ====================
  function copyToClipboardFallback(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      showToast('已复制', 'success');
    } catch (err) {
      showToast('复制失败', 'error');
    }
    
    document.body.removeChild(textarea);
  }
  
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      background: ${type === 'success' ? '#4ade80' : type === 'error' ? '#ef4444' : '#60a5fa'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-size: 14px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  // ==================== Initialize All ====================
  function init() {
    // Only run on post/page
    if (!document.querySelector('#post') && !document.querySelector('#page')) return;
    
    initTocActiveDetection();
    initHeadingAnchors();
    initTableEnhancements();
    initImageEnhancements();
    initSmoothScroll();
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

