import React from 'react'

function SolicitudesList ({ solicitudes }) {
  return (
    <ul>
      {solicitudes.map((solicitud) => (
        <li key={solicitud.id}>
          <p>Contacto: {solicitud.contacto}</p>
          <p>Explicación: {solicitud.explicacion}</p>
          <p>Fecha: {solicitud.fecha}</p>
        </li>
      ))}
    </ul>
  )
}

export default SolicitudesList
