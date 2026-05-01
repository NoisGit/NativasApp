import { useState } from 'react'

export function FormularioSolicitud ({ handleSolicitud }) {
  const [contacto, setContacto] = useState('')
  const [explicacion, setExplicacion] = useState('')
  const [deseaRecibirNoticias, setRecibirNoticias] = useState(false)
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [message, setMessage] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleContactoChange = (e) => {
    setContacto(e.target.value)
  }

  const handleExplicacionChange = (e) => {
    setExplicacion(e.target.value)
  }

  const handleDeseaRecibirNoticiasChange = () => {
    setRecibirNoticias(!deseaRecibirNoticias)
  }

  const handleFechaNacimientoChange = (e) => {
    setFechaNacimiento(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Contacto:', contacto)
    console.log('Explicación:', explicacion)
    console.log('Fecha de nacimiento:', fechaNacimiento)

    const hoy = new Date()
    const formatoFecha = new Date(fechaNacimiento)
    const edad = Math.floor((hoy - formatoFecha) / (365.25 * 24 * 60 * 60 * 1000))
    console.log('Edad:', edad)
    if (edad < 18) {
      setMessage(false)
      setError(true)
      return
    } else {
      setMessage(true)
      setError(false)
    }

    const solicitud = {
      contacto,
      explicacion,
      fechaNacimiento: fechaNacimiento.toString(),
      deseaRecibirNoticias
    }

    handleSolicitud(solicitud)

    // Reset form
    setContacto('')
    setExplicacion('')
    setRecibirNoticias(false)
    setFechaNacimiento('')
    setSuccess(true)
  }

  return (
    <form onSubmit={handleSubmit} className='flex justify-center items-center md:mt-28'>
      <div className='bg-gray-100 p-4 rounded-md'>
        <h2 className='text-xl font-bold mb-4 text-center'>Sé parte de nosotros!</h2>
        <input
          type='tel'
          pattern='[0-9]{9}'
          value={contacto}
          onChange={handleContactoChange}
          className='mb-2 p-2 border border-gray-300 rounded-md w-full'
          placeholder='Contacto (número de teléfono)'
          maxLength='9'
          required
        />

        <textarea
          value={explicacion}
          onChange={handleExplicacionChange}
          className='mb-2 p-2 border border-gray-300 rounded-md w-full'
          placeholder='Explique por qué desea ser parte del equipo'
          required
        />
        <div className='flex items-center mb-2'>
          <input
            type='checkbox'
            checked={deseaRecibirNoticias}
            onChange={handleDeseaRecibirNoticiasChange}
            className='mr-2'
          />
          <span>Desea recibir noticias?</span>
        </div>
        <div className='flex mb-2'>
          <input
            type='date'
            value={fechaNacimiento}
            onChange={handleFechaNacimientoChange}
            className='p-2 text-sm border border-gray-300 w-full mb-4 text-gray-500 font-sans font-light rounded transition duration-300 focus:outline-none focus:border-blue-500'
            placeholder='Día'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full'
        >
          Enviar solicitud
        </button>
        {!message && (
          <p className='text-red-500 mt-2'>Debes ser mayor de 18 años para postular.</p>
        )}
        {success && <p className='text-green-500 mt-2'>El formulario se ha enviado con éxito.</p>}
        {error && <p className='text-red-500 mt-2'>No se pudo enviar el formulario. Verifica los datos ingresados.</p>}
      </div>
    </form>
  )
}
