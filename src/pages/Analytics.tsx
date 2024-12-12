import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SalesAnalytics from '../components/analytics/SalesAnalytics';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

export default function Analytics() {
  return (
    <QueryClientProvider client={queryClient}>
      <SalesAnalytics />
    </QueryClientProvider>
  );
}