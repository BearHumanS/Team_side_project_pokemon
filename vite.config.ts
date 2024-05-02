import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import prerender from '@prerenderer/rollup-plugin';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/community'],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      renderer: '@prerenderer/renderer-puppeteer',
      server: {
        host: 'localhost',
        listenHost: 'localhost',
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 15000,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, 'https:')
          .replace(
            /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
            'my-poke-hub.vercel.app',
          );
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        icons: [
          {
            src: '/icon-192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable',
          },
          {
            src: '/icon-512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
