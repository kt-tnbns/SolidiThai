import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.react'

interface ProtectedRouteProps {
  element: React.ReactNode
  requireAuth?: boolean
}

export const ProtectedRoute = ({ element, requireAuth = true }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{element}</>
} 