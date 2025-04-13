import { toast } from "sonner"
import { LoginCredentials, User, AuthState } from "../types/auth"
import { useReducer, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const useAuthProvider = () => {
  const navigate = useNavigate();

  const loginApi = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
          resolve({
            user: {
              id: '1',
              firstName: 'Admin',
              lastName: 'User',
              email: 'admin@example.com',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            token: 'mock-jwt-token',
          })
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 1000)
    })
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
      navigate('/users');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', error: (error as Error).message });
      toast.error('Login failed: ' + (error as Error).message);
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
    ...state
  }
}

export { useAuthProvider }
