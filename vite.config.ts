import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import ViteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-query') ||
              id.includes('node_modules/react-router-dom') ||
              id.includes('node_modules/zustand')
            ) {
              return 'react';
            }

            if (
              id.includes('node_modules/antd') ||
              id.includes('node_modules/@toast-ui/react-editor') ||
              id.includes('node_modules/react-content-loader')
            ) {
              return 'ui-components';
            }

            if (
              id.includes('node_modules/axios') ||
              id.includes('node_modules/firebase') ||
              id.includes('node_modules/react-query')
            ) {
              return 'data-processing';
            }

            if (
              id.includes('node_modules/dom-to-image') ||
              id.includes('node_modules/file-saver')
            ) {
              return 'image-file-processing';
            }

            if (
              id.includes('node_modules/sass') ||
              id.includes('node_modules/uuid') ||
              id.includes('node_modules/@react-icons/all-files')
            ) {
              return 'styling-utilities';
            }

            return 'vendor';
          }
        },
      },
    },
  },
});
