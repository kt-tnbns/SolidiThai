import { toast } from "sonner"
import { LoginCredentials, User, AuthState } from "../types/auth"
import { useReducer, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../api/authApi"
import { HttpStatusCode } from "axios"

const useAuthProvider = () => {
  const navigate = useNavigate();

  const { mutateAsync: loginRequest, isPending: loginLoading } = useLogin()

  const loginApi = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const result = await loginRequest(credentials)
    return {
      user: result.user,
      token: result.accessToken,
    }
  }

  type AuthAction =
    | { type: 'LOGIN_REQUEST' }
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGIN_FAILURE'; error: string }
    | { type: 'LOGOUT' }

  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  }

  const loadState = (): AuthState => {
    try {
      const serializedState = localStorage.getItem('authState')
      if (serializedState === null) {
        return initialState
      }
      return JSON.parse(serializedState)
    } catch {
      return initialState
    }
  }

  const saveState = (state: AuthState) => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('authState', serializedState)
    } catch {
      toast.error('Failed to save auth state')
    }
  }

  const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        }
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
          loading: false,
          error: null,
        }
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
          error: action.error,
        }
      case 'LOGOUT':
        return {
          ...initialState,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(authReducer, loadState());

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const result = await loginApi(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: result });
      toast.success('Login successful');
      navigate('/user');
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', error: (error as Error).message });
      if (error.response.status === HttpStatusCode.BadRequest) {
        toast.error('Invalid email or password');
      } else {
        toast.error('Login failed: ' + (error as Error).message);
      }
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.info('You have been logged out');
    navigate('/login')
  };



  useEffect(() => {
    saveState(state);
  }, [state]);



  return {
    login,
    logout,
    ...state,
    loginLoading,
  }
}

export { useAuthProvider }
