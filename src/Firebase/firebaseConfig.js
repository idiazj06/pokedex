import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAe57fAVYpuzSzIkXxhi56pY-isMRdbCzE",
    authDomain: "pokedex-a5bd3.firebaseapp.com",
    projectId: "pokedex-a5bd3",
    storageBucket: "pokedex-a5bd3.appspot.com",
    messagingSenderId: "280579653667",
    appId: "1:280579653667:web:7eb4d277fc43852f057196"
  };

const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();
const db = getFirestore(app)

export {
    app,
    google,
    facebook,
    db
}