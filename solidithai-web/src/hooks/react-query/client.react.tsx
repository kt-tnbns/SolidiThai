import { QueryClient } from '@tanstack/react-query'
import { isTokenExpired } from './axios'

const shouldRetry = (failureCount: number, error: any) => {
  if (isTokenExpired(error)) {
    return failureCount < 1 // Retry once if token expired.
  }
  return false // Do not retry for other error codes
}

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: shouldRetry,
    },
  },
})
