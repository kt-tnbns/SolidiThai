import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { API } from '../../api'
import { objectToQueryString } from '../../utils/url'


const makeRequest = <T>(url: string, params = {}): Promise<T> =>
  new Promise((resolve, reject) => {
    API.get<T>(url, params)
      .then((data) => resolve(data))
      .catch((error) => reject(error))
  })

const useClientQuery = <T>(
  url: string,
  params = {},
  queryOptions = {},
  key?: string,
) => {
  const request = useCallback(() => makeRequest<T>(url, params), [params, url])

  const query = useQuery(
    {
      queryKey: [key || `${url}?${objectToQueryString(params)}`],
      queryFn: () => request(),
      ...queryOptions,
    }
  )

  return {
    ...query,
    reset: () => query.refetch(),
  }
}

export const useClientPrefetchQuery = <T>(
  url: string,
  params = {},
  queryOptions = {},
  key?: string,
) => {
  const queryClient = useQueryClient()
  const request = useCallback(() => makeRequest<T>(url, params), [params, url])

  return async () => {
    await queryClient.prefetchQuery({
      queryKey: [key || `${url}?${objectToQueryString(params)}`],
      queryFn: () => request(),
      ...queryOptions,
    })
  }
}

export type ClientQueryReturnType<T> = ReturnType<typeof useClientQuery<T>>

export default useClientQuery
