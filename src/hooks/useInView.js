import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element enters the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} triggerOnce - Whether to trigger only once (default: true)
 * @returns {[React.RefObject, boolean]} - [ref to attach to element, isInView state]
 */
export function useInView(options = {}, triggerOnce = true) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    };

    const observer = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting;
      
      if (inView) {
        setIsInView(true);
        if (triggerOnce && element) {
          observer.unobserve(element);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin, triggerOnce]);

  return [ref, isInView];
}