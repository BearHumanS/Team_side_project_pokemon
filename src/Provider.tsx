'use client';

import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/query/queryClient';
import { ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

export default function ReactQueryProviders({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
