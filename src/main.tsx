import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from "./routes.tsx";
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client instance for React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provide the QueryClient to your app */}
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </React.StrictMode>
);
