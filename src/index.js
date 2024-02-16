import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContextComponent } from './context/ContextComponent';
import ErrorBoundary from "./components/error/ErrorBoundray"
import App from "./App"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary >
    <ContextComponent>
      <App/>
    </ContextComponent>
    </ErrorBoundary>
  </React.StrictMode>
);
