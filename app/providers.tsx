'use client';

import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from 'react-query';

export const Providers = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
