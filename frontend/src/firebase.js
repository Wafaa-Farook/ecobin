// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDaFcKzVf7nvUAynIZD8G-zlXrSb3GAq5o",
  authDomain: "ecobin-663eb.firebaseapp.com",
  projectId: "ecobin-663eb",
  storageBucket: "ecobin-663eb.firebasestorage.app",
  messagingSenderId: "213169606754",
  appId: "1:213169606754:web:fcc3fcb5edd16c644f013b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
