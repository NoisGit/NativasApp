import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

export function NavBar () {
  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <nav
      className='position fixed z-40 flex justify-between items-center w-full h-16 px-4 md:px-0 text-white  bg-gradient-to-r from-sky-500 to-indigo-500'
    >
      {/* <h1 className='text-3xl text-indigo-500 w-full font-bold'>Nativas</h1> */}
      <picture className='w-full'>
        <img className='max-w-[200px]' src='../src/assets/logo.png' alt='logo nativas' />
      </picture>
      <ul className='hidden md:flex'>
        <li className='px-4 mx-2 border-b leading-8'>
          <Link to='/'>Inicio</Link>
        </li>
        <li className='px-4 mx-2 border-b leading-8'>
          <Link to='/'>Informaciones</Link>
        </li>
        <li className='px-4 mx-2 border-b leading-8'>
          <Link to='/'>Conocenos</Link>
        </li>
        <li className='px-4 mx-2 border-b leading-8'>
          <Link to='/login'>IniciarSesion</Link>
        </li>
        <li className='px-4 mx-2 border-b leading-8'>
          <Link to='/registrate'>Registrate</Link>
        </li>
      </ul>

      <div onClick={handleNav} className='block md:hidden'>
        {
        !nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />
        }
      </div>

      <div className={nav ? 'md:hidden fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#596ef0] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>

        {/* <h1 className='p-4 text-3xl text-indigo-500 w-full font-bold'>Nativas</h1> */}

        <ul className='uppercase mt-[20%]'>
          <li className='p-4 border-b border-gray-400'>
            <Link to='/'>Inicio</Link>
          </li>
          <li className='p-4 border-b border-gray-400'>
            <Link to='/'>Informaciones</Link>
          </li>
          <li className='p-4 border-b border-gray-400'>
            <Link to='/'>Conocenos</Link>
          </li>
          <li className='p-4 border-b border-gray-400'>
            <Link to='/login'>Iniciar Sesion</Link>
          </li>
          <li className='p-4'>
            <Link to='/registrate'>Registrate</Link>
          </li>
        </ul>
      </div>
      <div />
    </nav>
  )
}
