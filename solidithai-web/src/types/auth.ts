export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export type AuthContextType = AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}