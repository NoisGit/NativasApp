// import { useState, useEffect } from 'react'
import { db } from '../../api/firebase'
import { FormularioSolicitud } from '../../components/FormularioSolicitud.jsx'
import { NavBar } from '../../components/NavBar.jsx'
import { addDoc, collection } from 'firebase/firestore'
import { Footer } from '../../components/Footer'

export function SolicitudPage () {
  // const [solicitudes, setSolicitudes] = useState([])

  // useEffect(() => {
  //   const fetchSolicitudes = async () => {
  //     try {
  //       const snapshot = await getDocs(collection(db, 'solicitudes'))
  //       const solicitudesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //       setSolicitudes(solicitudesData)
  //     } catch (error) {
  //       console.error('Error al obtener las solicitudes:', error)
  //     }
  //   }

  //   fetchSolicitudes()
  // }, [])

  const handleSolicitud = async (solicitud) => {
    try {
      const docRef = await addDoc(collection(db, 'solicitudes'), solicitud)
      console.log('Solicitud enviada correctamente. ID:', docRef.id)
    } catch (error) {
      console.error('Error al guardar la solicitud:', error)
      console.log(
        'Ocurrió un error al guardar la solicitud. Por favor, inténtalo de nuevo más tarde.'
      )
    }
  }

  return (
    <>
      <NavBar />
      <div>
        <FormularioSolicitud handleSolicitud={handleSolicitud} />
        {/* <ul>
          {solicitudes.map((solicitud) => (
            <li key={solicitud.id}>
              <p>Contacto: {solicitud.contacto}</p>
              <p>Explicación: {solicitud.explicacion}</p>
              <p>Fecha: {solicitud.fecha}</p>
            </li>
          ))}
        </ul> */}
        <Footer />
      </div>
    </>
  )
}
