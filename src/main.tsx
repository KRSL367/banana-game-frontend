import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Step 1: Create a new QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </React.StrictMode>
);
