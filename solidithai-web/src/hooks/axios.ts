import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios, { HttpStatusCode } from 'axios'
import { API_URL } from '../constants/url'


export function isTokenExpired(error: any) {
  return (
    error.response?.status === HttpStatusCode.Unauthorized &&
    error.response?.data?.exception === 'Token expired'
  )
}

function createAxiosInstance() {
  const backendUrl = API_URL
  let isAlreadyFetchingAccessToken = false

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = JSON.parse(localStorage.getItem('authState') ?? '{}').token
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
      return config;
    },
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      isAlreadyFetchingAccessToken = false
      return response
    },
    async (error) => {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        console.error('Unauthorized error:', {
          errorCode: error.response?.data?.errorCode,
          message: error.response?.data?.message,
          exception: error.response?.data?.exception
        });
      }

      if (error.response?.status === HttpStatusCode.Forbidden) {
        window.location.href = '/403'
      }

      const errorCode = error.response?.data.errorCode
      if (
        error.response?.status === HttpStatusCode.Unauthorized &&
        errorCode === 'TOKEN_NOT_ACCESS'
      ) {
        if (!window.location.pathname.endsWith('sign-in')) {
          window.location.href = '/sign-in'
          sessionStorage.setItem('redirect_url', window.location.href)
        }
      }

      return Promise.reject(error)
    },
  )

  return axiosInstance
}

const axiosInstance = createAxiosInstance()

export { axiosInstance }
