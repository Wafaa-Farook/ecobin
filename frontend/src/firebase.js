// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut 
} from "firebase/auth";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// ✅ Function to Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};


export const logout = async (navigate) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    navigate("/login"); // Redirect to login page after logout
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

// ✅ Function to Sign Up with Email & Password
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign-Up Error:", error);
  }
};

// ✅ Function to Sign In with Email & Password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign-In Error:", error);
  }
};

// ✅ Function for Forgot Password
export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent!");
  } catch (error) {
    console.error("Forgot Password Error:", error);
  }
};