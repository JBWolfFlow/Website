import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

/**
 * LazyImage Component
 * Implements lazy loading with intersection observer
 * Includes blur-up placeholder effect for better UX
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {string} placeholderColor - Placeholder background color (default: gray-200)
 * @param {Function} onLoad - Callback when image loads
 * @param {Object} style - Additional inline styles
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderColor = 'bg-gray-200',
  onLoad,
  style = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={style}
    >
      {/* Placeholder */}
      <motion.div
        className={cn(
          'absolute inset-0',
          placeholderColor,
          'animate-pulse'
        )}
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Actual Image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={cn('w-full h-full object-cover', className)}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          onLoad={handleLoad}
          {...props}
        />
      )}
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholderColor: PropTypes.string,
  onLoad: PropTypes.func,
  style: PropTypes.object,
};

export default LazyImage;