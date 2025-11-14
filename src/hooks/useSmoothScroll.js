import { useEffect } from 'react';

/**
 * useSmoothScroll Hook
 * Enables smooth scrolling for all anchor links with hash navigation
 * Handles offset for fixed header and hash navigation on page load
 * 
 * @param {number} offset - Offset in pixels for fixed header (default: 80)
 */
const useSmoothScroll = (offset = 80) => {
  useEffect(() => {
    /**
     * Smooth scroll to target element
     * @param {string} targetId - ID of the target element
     */
    const scrollToTarget = (targetId) => {
      const target = document.getElementById(targetId);
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    };

    /**
     * Handle click events on anchor links
     * @param {Event} e - Click event
     */
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        scrollToTarget(targetId);
        
        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        } else {
          window.location.hash = href;
        }
      }
    };

    // Add click event listener
    document.addEventListener('click', handleClick);

    // Handle hash navigation on page load
    const handleHashOnLoad = () => {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          const targetId = hash.substring(1);
          scrollToTarget(targetId);
        }, 100);
      }
    };

    // Check for hash on initial load
    if (document.readyState === 'complete') {
      handleHashOnLoad();
    } else {
      window.addEventListener('load', handleHashOnLoad);
    }

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('load', handleHashOnLoad);
    };
  }, [offset]);
};

export default useSmoothScroll;