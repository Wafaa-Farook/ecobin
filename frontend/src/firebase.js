import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaFcKzVf7nvUAynIZD8G-zlXrSb3GAq5o",
  authDomain: "ecobin-663eb.firebaseapp.com",
  projectId: "ecobin-663eb",
  storageBucket: "ecobin-663eb.appspot.com",
  messagingSenderId: "213169606754",
  appId: "1:213169606754:web:fcc3fcb5edd16c644f013b"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Function to Sign Up with Email
const signUpWithEmail = async (email, password, fullName, phoneNumber, username) => {
  try {
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      throw new Error("User already exists! Redirecting to login...");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(userRef, {
      fullName,
      email,
      phoneNumber,
      username,
      createdAt: new Date()
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// 🔹 Function to Sign In with Email
const loginWithEmail = async (email, password) => {
  try {
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found! Redirecting to Register...");
    }

    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export { app, auth, db, signUpWithEmail, loginWithEmail };
