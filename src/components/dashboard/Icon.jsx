export function Icon ({ icon, onClick }) {
  const handleClick = (event) => {
    event.preventDefault() // Evita que se produzca la acción predeterminada del enlace
    if (onClick) {
      onClick() // Llama a la función onClick si está definida
    }
  }

  return (
    <li>
      <a href='/' onClick={handleClick}>
        {icon}
      </a>
    </li>
  )
}
