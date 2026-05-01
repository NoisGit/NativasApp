import React, { useState } from 'react'
import { FormularioRegistro } from '../../components/FormularioRegistro'
import registerImg from '../../assets/Roller_Form.png'
import { NavBar } from '../../components/NavBar'
import { Mensaje } from '../../components/Mensaje'
import { Layout } from '../../hoc/layout/Layout'
import { db, auth } from '../../api/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export function Registrate () {
  const [successReg, setSuccessReg] = useState(false)
  const navigate = useNavigate()

  const agregarUsuario = async (usuario) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), usuario)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handleRegistro = async ({ nombre, apellido, correo, password, terminos }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password)
      const user = userCredential.user

      if (user) {
        const newUser = {
          nombre,
          apellido,
          correo,
          terminos
        }

        await agregarUsuario(newUser)
        console.log('Usuario agregado')
        setSuccessReg(true)
        navigate('/login')
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
    }
  }

  return (
    <Layout>
      <div className='h-screen overflow-hidden'>
        <NavBar />
        <div className='flex h-auto w-full overflow-hidden'>
          <picture className='w-2/5 h-full filtro'>
            <img src={registerImg} alt='Register' className='w-full h-full' />
          </picture>
          {/* contenedor del formulario */}
          <div className='w-3/5 h-full flex justify-center items-center'>
            {successReg
              ? (
                <Mensaje mensaje='Registro exitoso' />
                )
              : (
                <FormularioRegistro handleRegistro={handleRegistro} />
                )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
