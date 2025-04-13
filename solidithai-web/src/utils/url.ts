import queryString from 'query-string'
import { useLocation, useParams } from 'react-router-dom'

export const queryStringToObject = (str: string, options = {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options,
  })

export const objectToQueryString = (obj: Record<string, any>, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options,
  })

export const encodeObject = (values: Record<string, any>) => {
  return btoa(objectToQueryString(values))
}

export const decodeObject = (code: string) => {
  return queryStringToObject(atob(code))
}

export function useRequireParams<Key extends string | number | symbol = string>(
  keys: Key[],
): Record<Key, string> {
  const params = useParams()

  if (!keys.every((key) => key in params)) {
    throw new Error('Input key not in params')
  }

  return params as unknown as Record<Key, string>
}

export const usePrefixPathname = () => {
  const location = useLocation()
  return location.pathname.split('/')[1]
}
