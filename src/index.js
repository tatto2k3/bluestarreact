import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from '../src/Components/Utils/AuthService';

const baseElement = document.getElementsByTagName('base')[0];
const baseUrl = baseElement?.getAttribute('href') ?? '/';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter basename={baseUrl}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
