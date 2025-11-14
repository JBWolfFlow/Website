import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Loading Component
 * Reusable spinner component for async operations
 * Used in forms, data fetching, and other loading states
 * 
 * @param {string} size - Size of the spinner: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} color - Color of the spinner (default: 'blue')
 * @param {string} text - Optional loading text to display
 * @param {boolean} fullScreen - Whether to display as full screen overlay
 */
const Loading = ({ 
  size = 'md', 
  color = 'blue', 
  text = '', 
  fullScreen = false 
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  // Color configurations
  const colorClasses = {
    blue: 'border-blue-600 border-t-transparent',
    purple: 'border-purple-600 border-t-transparent',
    green: 'border-green-600 border-t-transparent',
    red: 'border-red-600 border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  const spinnerClass = `${sizeClasses[size]} ${colorClasses[color]} rounded-full`;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={spinnerClass}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 text-sm font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      >
        {spinner}
      </motion.div>
    );
  }

  return spinner;
};

Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['blue', 'purple', 'green', 'red', 'white']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loading;