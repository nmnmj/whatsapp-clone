import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAyrz_CsZdYkUuTCNdWmbrHTXkbfjq4iwI",
  // apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "whatsapp-clone-72e97.firebaseapp.com",
  // authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: "whatsapp-clone-72e97",
  storageBucket: "whatsapp-clone-72e97.appspot.com",
  messagingSenderId: "263774679034",
  appId: "1:263774679034:web:5e0a886352a8b92e127e43",
  // appId: process.env.REACT_APP_APPID,
  measurementId: "G-XLV5NNGYWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { app, auth, provider }
export default db