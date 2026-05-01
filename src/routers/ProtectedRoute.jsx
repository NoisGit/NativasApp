import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export function ProtectorRuta ({ children }) {
  const { user } = useAuth()
  if (user === false) {
    return <Navigate to='/' />
  }
  return children
}
