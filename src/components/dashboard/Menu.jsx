import React, { useEffect } from 'react'
import { Icon } from './Icon'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FaDelicious,
  FaChartLine,
  FaRegClock,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa'

import './menu.css'
import Logo from '../../assets/img/logouser.png'
// import { FormularioSolicitud } from '../FormularioSolicitud'
import { SolicitudPage } from '../../containers/pages/SolicitudPage'

function Menu () {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const mainMenuLi = document
      .getElementById('mainMenu')
      .querySelectorAll('li')

    function changeActive () {
      mainMenuLi.forEach((n) => n.classList.remove('active'))
      this.classList.add('active')
    }

    mainMenuLi.forEach((n) => n.addEventListener('click', changeActive))

    return () => {
      mainMenuLi.forEach((n) => n.removeEventListener('click', changeActive))
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <menu>
        <img src={Logo} alt='' />

        <ul id='mainMenu'>
          <Icon icon={<FaDelicious />} />
          {/* <Icon icon={<FaShoppingCart />} />
        <Icon icon={<FaWallet />} /> */}
          <Icon icon={<FaChartLine />} />
          <Icon icon={<FaRegClock />} />
        </ul>

        <ul className='lastMenu'>
          <Icon icon={<FaCog />} />
          <Icon icon={<FaSignOutAlt />} onClick={handleLogout} />
        </ul>
      </menu>

      <div className='solicitud'>
        {/* <FormularioSolicitud /> */}
        <SolicitudPage />
      </div>
    </>
  )
}

export default Menu
