import { FormularioLogin } from '../../components/FormularioLogin'
import { Layout } from '../../hoc/layout/Layout'
import { NavBar } from '../../components/NavBar'
import loginImg from '../../assets/Roller_Login.png'
import { Mensaje } from '../../components/Mensaje'
import { db } from '../../api/firebase'
import { useAuth } from '../../context/AuthContext'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function Login () {
  const admins = collection(db, 'admins')
  const navigate = useNavigate()
  const { user, login } = useAuth()

  const handleLogin = async ({ usuario, password }) => {
    try {
      await login(usuario, password)
      const q = query(admins, where('email', '==', usuario))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        // Es un administrador, redirigir a /adm
        navigate('/adm')
      } else {
        // No es un administrador, redirigir a /user
        navigate('/user')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Redirigir al usuario si la sesión está activa
  useEffect(() => {
    if (user) {
      navigate('/user')
    }
  }, [user])

  return (
    <Layout>
      <div className='h-screen w-full overflow-hidden '>
        <NavBar />

        <div className='w-full h-screen md:flex'>
          <picture className='w-3/6 filtro'>
            <img className='w-full h-full' src={loginImg} alt='' />
          </picture>

          <div className='md:mt-20 absolute top-[20%] left-[25%] sm:left-[30%] md:relative md:left-2 md:top-4 md:w-2/5'>
            {user
              ? (
                <Mensaje mensaje='Login Correcto' />
                )
              : (
                <FormularioLogin functionSuccess={handleLogin} />
                )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
