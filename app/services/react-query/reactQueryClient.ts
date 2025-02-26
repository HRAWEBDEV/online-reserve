import { QueryClient, isServer } from '@tanstack/react-query';

let reactQueryClient: QueryClient | null = null;

function createReactQueryClient(): QueryClient {
 return new QueryClient({
  defaultOptions: {
   queries: {},
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
