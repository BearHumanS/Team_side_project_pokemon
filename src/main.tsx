import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/styles/global.scss';
import AuthGurad from './provider/AuthGurad';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthGurad>
      <App />
    </AuthGurad>
  </React.StrictMode>,
);
