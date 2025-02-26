'use client';
import { PropsWithChildren, useMemo } from 'react';
import { getReactQueryClient } from './reactQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function ReactQueryProvider({ children }: PropsWithChildren) {
 const queryClient = useMemo(() => getReactQueryClient(), []);
 return (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
 );
}
