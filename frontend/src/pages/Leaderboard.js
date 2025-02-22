import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const Leaderboard = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const usersCollection = collection(db, "leaderboard");
      const leaderboardQuery = query(usersCollection, orderBy("points", "desc"));
      const leaderboardSnapshot = await getDocs(leaderboardQuery);

      const userList = leaderboardSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userList);
    };

    fetchLeaderboard();
  }, []);

  // Fetch individual user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (userId) {
        const userRef = doc(db, "leaderboard", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCurrentUser({ id: userSnap.id, ...userSnap.data() });
        }
      }
    };

    fetchCurrentUser();
  }, [userId]);

  return (
    <div className="p-4">
      {/* Individual User Score */}
      {currentUser ? (
        <div className="mb-6 p-4 bg-green-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Your Score</h2>
          <p className="text-lg">Name: {currentUser.name}</p>
          <p className="text-lg">Points: {currentUser.points}</p>
        </div>
      ) : (
        <p className="mb-6">Loading your score...</p>
      )}

      {/* Global Leaderboard */}
      <div className="p-4 bg-blue-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              key={user.id}
              className={`p-2 rounded-lg ${
                user.id === userId ? "bg-yellow-200" : "bg-white"
              } shadow`}
            >
              <strong>{index + 1}.</strong> {user.name} - {user.points} pts
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
