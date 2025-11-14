import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * ImageModal Component
 * Full-screen modal for viewing images with navigation
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close handler
 * @param {string} props.currentImage - Current image URL
 * @param {string} props.currentTitle - Current image title
 * @param {Function} props.onNext - Next image handler
 * @param {Function} props.onPrevious - Previous image handler
 * @param {number} props.currentIndex - Current image index
 * @param {number} props.totalImages - Total number of images
 */
export function ImageModal({
  isOpen,
  onClose,
  currentImage,
  currentTitle,
  onNext,
  onPrevious,
  currentIndex,
  totalImages,
}) {
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2 md:mb-4 px-2 flex-shrink-0">
                <div className="flex-1">
                  <h2 className="text-white text-xl md:text-2xl font-semibold">
                    {currentTitle}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {currentIndex + 1} / {totalImages}
                  </p>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className={cn(
                    'p-2 rounded-lg',
                    'bg-white/10 hover:bg-white/20',
                    'text-white transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-white/50'
                  )}
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image Container */}
              <div className="relative flex-1 flex items-center justify-center min-h-0 overflow-hidden">
                {/* Previous Button */}
                <button
                  onClick={onPrevious}
                  className={cn(
                    'absolute left-1 md:left-2 z-10',
                    'p-2 md:p-3 rounded-full',
                    'bg-white/10 hover:bg-white/20 backdrop-blur-sm',
                    'text-white transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-white/50',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'hover:scale-110 active:scale-95'
                  )}
                  disabled={currentIndex === 0}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                </button>

                {/* Image */}
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center px-12 md:px-16"
                >
                  <img
                    src={currentImage}
                    alt={currentTitle}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </motion.div>

                {/* Next Button */}
                <button
                  onClick={onNext}
                  className={cn(
                    'absolute right-1 md:right-2 z-10',
                    'p-2 md:p-3 rounded-full',
                    'bg-white/10 hover:bg-white/20 backdrop-blur-sm',
                    'text-white transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-white/50',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'hover:scale-110 active:scale-95'
                  )}
                  disabled={currentIndex === totalImages - 1}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                </button>
              </div>

              {/* Thumbnail Navigation (optional, for desktop) */}
              <div className="hidden md:flex items-center justify-center gap-2 mt-2 md:mt-4 px-2 flex-shrink-0">
                {Array.from({ length: totalImages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const diff = index - currentIndex;
                      if (diff > 0) {
                        for (let i = 0; i < diff; i++) onNext();
                      } else if (diff < 0) {
                        for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                      }
                    }}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-200',
                      index === currentIndex
                        ? 'bg-white w-8'
                        : 'bg-white/40 hover:bg-white/60'
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}