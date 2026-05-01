// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyDL3G82-wceLOB7rwqdQyNzvx5QRrEja18',
  authDomain: 'nativasapp-a44ab.firebaseapp.com',
  projectId: 'nativasapp-a44ab',
  storageBucket: 'nativasapp-a44ab.appspot.com',
  messagingSenderId: '261258976552',
  appId: '1:261258976552:web:c4f36516d3c577e43e041d',
  measurementId: 'G-PCPS4J37VY'
}
// Initialize Firebase com el correo de nativas
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
