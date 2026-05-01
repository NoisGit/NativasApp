import { useContext, createContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(false)

  const login = () => {
    setUser(false)
  }

  const logout = () => {
    setUser(false)
  }

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}
