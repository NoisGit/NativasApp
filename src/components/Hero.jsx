import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import rollerImage from '../assets/roller.jpg'

const heroWords = ['Patina', 'Entrena', 'Únete']

export function Hero () {
  const navigate = useNavigate()
  const [wordIndex, setWordIndex] = useState(0)

  const handleUnetenos = () => {
    navigate('/solicitud')
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWordIndex((currentIndex) => (currentIndex + 1) % heroWords.length)
    }, 1800)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div
      className='text-white txt-shadow bg-cover h-full flex-grow flex flex-col justify-center items-center'
      style={{ backgroundImage: `url(${rollerImage})` }}
    >
      <div className='max-w-[800px] w-full h-full text-center flex flex-col justify-center'>
        <p className='text-xl sm:text-2xl md:text-4xl md:mt-10 text-indigo-700 font-bold p-2'>
          Sé parte de Nativas Roller Derby
        </p>
        <h1 className='md:text-6xl sm:text-6xl text-4xl font-bold md-2'>Nativas</h1>
        <div className='flex justify-center items-center flex-col md:mt-10 '>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold'>
            ¡Conviértete en parte de nuestra familia!
          </p>
          <span className='md:text-5xl sm:text-4xl text-indigo-700 text-xl font-bold pl-2 transition-opacity duration-500'>
            {heroWords[wordIndex]}
          </span>
        </div>
        <button
          onClick={handleUnetenos}
          type='button'
          className='bg-indigo-500 text-black w-[200px] rounded-md font-medium my-6 mx-auto py-3 transition-colors hover:bg-indigo-700 hover:border-white hover:border hover:text-white duration-3 '
        >
          Únete
        </button>
        <div />
      </div>
    </div>
  )
}
