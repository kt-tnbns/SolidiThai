import { API_URL } from "../constants/url"
import { useDeleteAPI, useGetAPI, usePostAPI, usePutAPI } from "../hooks/useAPI"
import { ListResponse } from "../types/api"
import { User } from "../types/auth"
import { DropFirst } from "../utils/utilityTypes"

export const userApi = {
  GET_USERS: `${API_URL}/users`,
  GET_USER_BY_ID: (id: string) => `${API_URL}/users/${id}`,
  CREATE_USER: `${API_URL}/users`,
  UPDATE_USER: (id: string) => `${API_URL}/users/${id}`,
  DELETE_USER: (id: string) => `${API_URL}/users/${id}`,
}

export const useGetUsers = (...args: DropFirst<Parameters<typeof useGetAPI<ListResponse<User>>>>) =>
  useGetAPI<ListResponse<User>>(userApi.GET_USERS, ...args)

export const useGetUserById = (id: string, ...args: DropFirst<Parameters<typeof useGetAPI<User>>>) =>
  useGetAPI<User>(userApi.GET_USER_BY_ID(id), ...args)

export const useCreateUser = (...args: DropFirst<Parameters<typeof usePostAPI<User>>>) =>
  usePostAPI<User>(userApi.CREATE_USER, ...args)

export const useUpdateUser = (id: string, ...args: DropFirst<Parameters<typeof usePutAPI<User>>>) =>
  usePutAPI<User>(userApi.UPDATE_USER(id), ...args)

export const useDeleteUser = (id: string, ...args: DropFirst<Parameters<typeof useDeleteAPI<User>>>) =>
  useDeleteAPI<User>(userApi.DELETE_USER(id), ...args)
