import type { AxiosRequestConfig } from 'axios'

export interface IOptions {
  config: AxiosRequestConfig
}

export type TData = Record<string, any>

export type APIMethods = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type MetaItemResponse = {
  id: number | string
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
}

export type ListResponse<T> = {
  items: T[]
  total: number
}
