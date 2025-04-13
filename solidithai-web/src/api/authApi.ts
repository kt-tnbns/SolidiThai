import { API_URL } from "../constants/url"
import { usePostAPI } from "../hooks/useAPI"
import { LoginCredentials, LoginResponse } from "../types/auth"
import { DropFirst } from "../utils/utilityTypes"

export const authApi = {
  LOGIN: `${API_URL}/auth/login`,
  
}

export const useLogin = (...args: DropFirst<Parameters<typeof usePostAPI<LoginCredentials>>>) =>
  usePostAPI<LoginResponse>(authApi.LOGIN, ...args)