import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";

// ✅ Register User
export const registerUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Login User
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Logout User
export const logoutUser = async () => {
  await signOut(auth);
};

// ✅ Reset Password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Google Sign-In
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
