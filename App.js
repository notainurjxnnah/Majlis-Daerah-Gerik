import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './utils/toast';
import AppRoutes from './routes';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
