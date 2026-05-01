import React, { useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { FaBell, FaChevronDown } from 'react-icons/fa'
import perfil from '../../assets/img/perfil.png'

function TopContainer () {
  useEffect(() => {
    const mouseTarget = document.getElementById('menuChevron')
    const menuContainer = document.getElementById('menuContainer')

    mouseTarget.addEventListener('mouseenter', () => {
      mouseTarget.style.transform = 'rotate(180deg)'
      menuContainer.style.transform = 'translateX(0px)'
    })

    menuContainer.addEventListener('mouseleave', () => {
      mouseTarget.style.transform = 'rotate(0deg)'
      menuContainer.style.transform = 'translateX(300px)'
    })
  }, [])

  return (
    <div className='topContainer'>
      <div className='inputBox'>
        <input type='text' placeholder='Search items, collections' />
        <i>
          <BiSearchAlt />
        </i>
      </div>

      <div className='profileContainer'>
        <i className='profileIcon'>
          <FaBell />
        </i>
        <div className='profileImage'>
          <img src={perfil} alt='' />
        </div>
        <p className='profileName'>Melon uwu</p>
        <i className='menuChevron' id='menuChevron'>
          <FaChevronDown />
        </i>

        <div className='menuContainer' id='menuContainer'>
          <ul>
            <li>Web design</li>
            <li>UI / UX</li>
            <li>Form Design</li>
            <li>UI design</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TopContainer
