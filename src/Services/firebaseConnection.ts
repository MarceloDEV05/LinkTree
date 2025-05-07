
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCxkUgJGgU80_NBHWp6hiH2gJWrx-K1Ndw",
  authDomain: "linktree-react-typescript.firebaseapp.com",
  projectId: "linktree-react-typescript",
  storageBucket: "linktree-react-typescript.firebasestorage.app",
  messagingSenderId: "197006818794",
  appId: "1:197006818794:web:4c983849cddd881b734693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const dataBase = getFirestore(app)

