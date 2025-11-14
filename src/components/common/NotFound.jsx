import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';

/**
 * NotFound Component
 * Custom 404 error page with friendly message
 * Includes navigation options and animated illustration
 * Matches site design system
 */
const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            404
          </h1>
        </motion.div>

        {/* Animated Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Search className="w-24 h-24 text-blue-600" />
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              !
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            It might have been moved or deleted, or you may have mistyped the URL.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Button>
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Here are some helpful links instead:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="/#about"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              About Us
            </a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <a
              href="/#services"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Services
            </a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <a
              href="/#portfolio"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Portfolio
            </a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <a
              href="/#contact"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;