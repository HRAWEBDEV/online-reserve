import { QueryClient, isServer } from '@tanstack/react-query';

let reactQueryClient: QueryClient | null = null;

function createReactQueryClient(): QueryClient {
 return new QueryClient({
  defaultOptions: {
   queries: {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
   },
  },
 });
}

function getReactQueryClient(): QueryClient {
 if (isServer) {
  return createReactQueryClient();
 } else {
  if (!reactQueryClient) reactQueryClient = createReactQueryClient();
  return reactQueryClient;
 }
}

export { getReactQueryClient };
