// import { userAuth } from '../../context/AuthContext'
import Menu from '../../components/dashboard/Menu'
// import { NavBar } from '../../components/NavBar'
// import Container from '../../components/dashboard/Container'

export function UserPage () {
  // const { logout } = userAuth()

  // const handleLogout = () => {
  //   logout()
  // }
  return (
    <div className='dash'>
      {/* <NavBar /> */}
      <Menu />
      {/* <Container /> */}

      {/* <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleLogout}
      >
        Logout
      </button> */}
    </div>
  )
}
