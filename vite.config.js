import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  // Base URL for GitHub Pages
  // Use '/' for custom domain, or '/repository-name/' for github.io subdomain
  base: '/',
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
      '@legal': path.resolve(__dirname, './src/components/legal'),
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  build: {
    // Disable source maps in production for security
    sourcemap: mode === 'development',
    
    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.log in production
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        // Remove dead code
        dead_code: true,
        // Additional optimizations
        passes: 2,
      },
      mangle: {
        // Mangle variable names for smaller bundle
        safari10: true,
      },
      format: {
        // Remove comments in production
        comments: false,
      },
    },
    
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'animations': ['framer-motion'],
          'forms': ['react-hook-form'],
          'router': ['react-router-dom'],
        },
        // Asset file naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
    
    // Target modern browsers for smaller bundle
    target: 'es2015',
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Optimize dependencies
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  
  // Preview server configuration (for testing production build)
  preview: {
    port: 4173,
    strictPort: true,
    open: true,
  },
}))