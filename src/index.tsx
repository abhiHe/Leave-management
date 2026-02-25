import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'primereact/resources/themes/lara-light-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';                // Core CSS
import 'primeicons/primeicons.css'; 
import 'primeflex/primeflex.css';                             // Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

