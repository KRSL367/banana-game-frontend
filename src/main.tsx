import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
);
