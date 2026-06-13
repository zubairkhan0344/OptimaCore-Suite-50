import React, { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export function render(url?: string) {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
