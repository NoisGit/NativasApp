import React from 'react'
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare
} from 'react-icons/fa'

export const Footer = () => {
  return (
    <div className='md:w-full p-8 mx-auto py-16 grid lg:grid-cols-3 gap-8 text-gray-300 bg-black'>
      <div>
        <h1 className='w-full text-3xl font-bold text-indigo-500'>Equipo Nativas</h1>
        <p className='py-4'>Somos el equipo de roller derby "Nativas". ¡Acompáñanos en nuestras aventuras en patines!</p>
        <div className='flex justify-between md:w-[75%] my-6'>
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
        <div>
          <h6 className='font-medium text-gray-400'>Información</h6>
          <ul>
            <li className='py-2 text-sm'>Historia</li>
            <li className='py-2 text-sm'>Jugadoras</li>
            <li className='py-2 text-sm'>Partidos</li>
            <li className='py-2 text-sm'>Contacto</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Patrocinadores</h6>
          <ul>
            <li className='py-2 text-sm'>Sponsor 1</li>
            <li className='py-2 text-sm'>Sponsor 2</li>
            <li className='py-2 text-sm'>Sponsor 3</li>
            <li className='py-2 text-sm'>Sponsor 4</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Eventos</h6>
          <ul>
            <li className='py-2 text-sm'>Próximos partidos</li>
            <li className='py-2 text-sm'>Entrenamientos</li>
            <li className='py-2 text-sm'>Campeonatos</li>
            <li className='py-2 text-sm'>Talleres</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
