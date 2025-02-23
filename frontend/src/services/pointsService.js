import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";

// ✅ Get User Score
export const getUserScore = async (userId) => {
  if (!userId) return 0;
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data().score || 0 : 0;
  } catch (error) {
    console.error("Error fetching user score:", error);
    return 0;
  }
};

// ✅ Update User Score
export const updateUserScore = async (userId, points) => {
  if (!userId) return;
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, { score: userSnap.data().score + points });
    } else {
      await setDoc(userRef, { score: points });
    }
  } catch (error) {
    console.error("Error updating score:", error);
  }
};

// ✅ Get Leaderboard
export const getLeaderboard = async () => {
  try {
    const leaderboardQuery = query(collection(db, "users"), orderBy("score", "desc"), limit(10));
    const leaderboardSnap = await getDocs(leaderboardQuery);
    return leaderboardSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};
