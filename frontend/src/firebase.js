// Import Firebase modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// 🔹 Replace this with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBNfRXgqf603JARhiFBDNvKtpN4GNmTq88",
  authDomain: "ecobin-40c34.firebaseapp.com",
  projectId: "ecobin-40c34",
  storageBucket: "ecobin-40c34.appspot.com",
  messagingSenderId: "215367277242",
  appId: "1:215367277242:web:8a76c01fc7b1a9a4b2c083",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user to Firestore (optional)
    await setDoc(doc(db, "users", user.uid), {
      email,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error;
  }
};

// Login function
const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// Logout function
const logoutUser = async () => {
  await signOut(auth);
};

export { app, auth, db, signUpWithEmail, loginWithEmail, logoutUser };
