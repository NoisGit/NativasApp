import { Layout } from '../../hoc/layout/Layout'
import { NavBar } from '../../components/NavBar'
import { Footer } from '../../components/Footer'
import { FormNoticia } from '../../components/FormNoticia'
import { db } from '../../api/firebase'
import { collection, addDoc } from 'firebase/firestore'

export function AdmPage () {
  const handleGuardarNoticia = async (noticia) => {
    try {
      const docRef = await addDoc(collection(db, 'noticias'), noticia)
      console.log(noticia)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <Layout>
      <NavBar />
      <h1>AdmPage</h1>
      <FormNoticia fnAgregarNoticia={handleGuardarNoticia} />
      <Footer />
    </Layout>
  )
}
