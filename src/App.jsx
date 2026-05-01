import { AuthContextProvider } from './context/AuthContext'
import AppRouter from './routers/router'

function App () {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  )
}

export default App
