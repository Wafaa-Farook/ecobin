// Import Firebase modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase config for EcoBin
const firebaseConfig = {
  apiKey: "AIzaSyBNfRXgqf603JARhiFBDNvKtpN4GNmTq88",
  authDomain: "ecobin-40c34.firebaseapp.com",
  projectId: "ecobin-40c34",
  storageBucket: "ecobin-40c34.firebasestorage.app",
  messagingSenderId: "215367277242",
  appId: "1:215367277242:web:8a76c01fc7b1a9a4b2c083",
  measurementId: "G-2S52L18ZLM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 🔹 Sign up with email
const signUpWithEmail = async (email, password, username, phoneNumber) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      username,
      email,
      phoneNumber,
      createdAt: new Date()
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// 🔹 Login with email
const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in with email:", error.message);
    throw error;
  }
};

// 🔹 Google login
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        username: user.displayName,
        email: user.email,
        phoneNumber: "",
        createdAt: new Date()
      });
    }

    return user;
  } catch (error) {
    console.error("Google login failed:", error.message);
    throw error;
  }
};

const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider); // This opens the Google popup
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        username: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
        createdAt: new Date()
      });
    }

    return user;
  } catch (error) {
    console.error("Google signup failed:", error); // Log the full error
    throw error;
  }
};

export { app, auth, db, signUpWithEmail, loginWithEmail, loginWithGoogle, signUpWithGoogle };
