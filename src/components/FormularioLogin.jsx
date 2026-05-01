import { useState } from 'react'
import { Link } from 'react-router-dom'

export function FormularioLogin ({ functionSuccess }) {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')

  const handleFormulario = (e) => {
    e.preventDefault()

    const user = {
      usuario,
      password
    }

    functionSuccess(user)
  }

  return (

    <form className='z-10 w-full flex flex-col items-center p-2 bg-[#9b70ff] rounded-lg md:m-[5%]'>
      <div className=''>
        <h2 className='text-3xl sm:text-6xl text-white px-8 font-bold text-transparent font-mplus text-center txt-shadow'>
          BIENVENIDO
        </h2>
      </div>
      <div className='w-[80%] flex flex-col py-2'>
        <label className='font-mplus text-2xl font-bold'>Usuario</label>
        <input
          onChange={(e) => setUsuario(e.target.value)}
          className='py-3 font-mplus font-bold rounded-lg border-2 border-blue-700 mt-2 p-2'
          placeholder='HOLA@TUCORREO.CL'
          type='email'
          required
        />
      </div>
      <div className='w-[80%] flex flex-col py-2'>
        <label className='font-mplus text-2xl font-bold '>Contraseña</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className='py-3 font-mplus font-bold rounded-lg border-2 border-violet-600 mt-2 p-2'
          placeholder='INGRESA SU CONTRASEÑA'
          type='password'
          required
        />
      </div>
      <div className='flex flex-col font-marvel justify-center py-2'>
        <p>¿No tienes una cuenta ? <Link to='/registrate/'><span className='text-white'>Registrate!</span></Link></p>
        <p>¿Olvidaste tu contraseña ? <Link to='/recuperar/'><span className='text-white'>Recuperar!</span></Link></p>
      </div>
      <button
        onClick={handleFormulario}
        className='btn-indigo w-3/5 my-5 py-5 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-lg'
      >
        INGRESAR
      </button>
    </form>
  )
}
