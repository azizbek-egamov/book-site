import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.jsx';
import { StaticRouter } from 'react-router-dom/server';

console.log('Rendering...');
try {
  renderToString(<StaticRouter location="/admin/login"><App /></StaticRouter>);
  console.log('Success');
} catch (e) {
  console.error('Error:', e);
}
