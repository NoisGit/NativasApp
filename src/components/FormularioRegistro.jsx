import { useState } from 'react'
import { Link } from 'react-router-dom'

export function FormularioRegistro ({ handleRegistro }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [terminos, setTerminos] = useState(false)

  const handleForm = (e) => {
    e.preventDefault()

    const newUser = {
      nombre,
      apellido,
      correo,
      password,
      terminos
    }

    handleRegistro(newUser)
  }

  return (
    <form
      onSubmit={handleForm}
      className='w-full md:mt-36 h-full flex flex-col items-center justify-center gap-2 overflow-hidden'
    >
      {/* contenedor del titulo */}
      <div className='text-violet-700  font-caveat text-center txt-shadow flex flex-col gap-2.5'>
        <h1 className='font-bold text-5xl'>COMIENZA TOTALMENTE GRATIS</h1>
        <h2 className='text-xl'>
          INGRESA LA SIGUIENTE INFORMACIÓN PARA REGISTRARTE
        </h2>
      </div>
      {/* contenedor de los inputs */}
      <div className='w-5/6 flex flex-col items-center gap-2.5'>
        {/* inputs nombre y apellido */}
        <div className='flex w-full  gap-2.5'>
          <input
            className='w-1/2 font-mplus font-bold rounded-lg border-2 border-violet-600 p-2 '
            type='text'
            placeholder='Nombre'
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            required
          />
          <input
            className='w-1/2 font-mplus font-bold rounded-lg border-2 border-violet-600 p-2.5 '
            type='text'
            placeholder='Apellido'
            onChange={(e) => setApellido(e.target.value)}
            value={apellido}
          />
        </div>
        {/* inputs correo y contraseña */}
        <div className='flex flex-col align-cener w-full my-2 gap-4'>
          <input
            className='w-full font-mplus font-bold rounded-lg border-2 border-violet-600 p-2.5'
            type='email'
            placeholder='Correo electrónico'
            onChange={(e) => setCorreo(e.target.value)}
            value={correo}
            required
          />
          <input
            className='w-full font-mplus font-bold rounded-lg border-2 border-violet-600 p-2.5'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Contraseña'
            value={password}
            required
          />
        </div>
      </div>
      {/* input checkbox */}
      <div className='w-5/6'>
        <label className='font-mplus font-bold'>
          <input
            type='checkbox'
            onChange={(e) => setTerminos(e.target.checked)}
            value={terminos}
            required
          /> Acepto los términos y condiciones del servicio
        </label>
      </div>

      {/* container de los botones */}
      <div className='w-5/6 flex gap-2.5'>

        {/* boton de registro */}
        <button
          className='btn-indigo w-1/2 my-5 py-5 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-lg'
          type='submit'
        >
          CREAR UNA CUENTA
        </button>

        {/* boton de inicio de sesion */}
        <Link to='/Login/' className='btn-indigo w-1/2 my-5 py-5 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold rounded-lg text-center'>
          INICIA SESIÓN
        </Link>

      </div>
    </form>
  )
}
