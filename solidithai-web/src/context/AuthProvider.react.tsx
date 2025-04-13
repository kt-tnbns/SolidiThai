import { AuthContext } from './AuthContext.react'
import { AuthContextType } from '../types/auth'
import { useAuthProvider } from './useAuthProvider'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const contextData: AuthContextType = useAuthProvider()

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}

