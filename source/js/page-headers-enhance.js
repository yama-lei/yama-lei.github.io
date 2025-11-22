// ============================================
// Page Headers Enhancement with Bing Daily Image
// For Archive, Category, Tag, etc pages
// ============================================

(function() {
  // Only run on non-homepage, non-post pages
  const pageHeader = document.querySelector('#page-header:not(.full_page):not(.post-bg)');
  if (!pageHeader) return;
  
  // Fetch and set Bing daily image
  function loadBingDailyImage() {
    fetch('https://bing.biturl.top/')
      .then(response => response.json())
      .then(data => {
        if (data && data.url) {
          // Set the background image
          pageHeader.style.backgroundImage = `url('${data.url}')`;
          pageHeader.style.backgroundSize = 'cover';
          pageHeader.style.backgroundPosition = 'center';
          pageHeader.style.backgroundRepeat = 'no-repeat';
          
          // Add copyright info if available
          if (data.copyright) {
            addCopyrightInfo(data.copyright, data.copyright_link);
          }
          
          console.log('✅ Bing Daily Image loaded for page header');
        }
      })
      .catch(error => {
        console.warn('Failed to load Bing daily image for page header:', error);
      });
  }
  
  // Add copyright information
  function addCopyrightInfo(copyright, link) {
    // Check if copyright already exists
    if (pageHeader.querySelector('.bing-copyright')) return;
    
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'bing-copyright';
    
    if (link) {
      copyrightDiv.innerHTML = `<small><a href="${link}" target="_blank" rel="noopener">${copyright}</a></small>`;
    } else {
      copyrightDiv.innerHTML = `<small>${copyright}</small>`;
    }
    
    pageHeader.appendChild(copyrightDiv);
  }
  
  // Initialize
  function init() {
    loadBingDailyImage();
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


