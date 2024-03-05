import React from 'react';
import App from './App.tsx';
import '@/styles/global.scss';
import AuthGuard from './provider/AuthGuard';
import Meta from './Meta.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (rootElement) {
  const app = (
    <React.StrictMode>
      <HelmetProvider>
        <Meta />
        <AuthGuard>
          <App />
        </AuthGuard>
      </HelmetProvider>
    </React.StrictMode>
  );

  const root = createRoot(rootElement);
  root.render(app);
}
