import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore();

// ✅ Add User to Firestore
const addUserToFirestore = async (userId, name, email) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, { name, email, score: 0 });
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// ✅ Register User
export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await addUserToFirestore(user.uid, name, email);
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
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await addUserToFirestore(user.uid, user.displayName, user.email);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
