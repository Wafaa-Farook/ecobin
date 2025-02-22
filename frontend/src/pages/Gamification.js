import React, { useState } from "react";
import Leaderboard from "./Leaderboard";
import Points from "./Points";

const Gamification = () => {
  const [userPoints, setUserPoints] = useState(0);

  const handlePoints = (points) => {
    setUserPoints(userPoints + points);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">🌱 EcoBin Gamification</h1>
      <h2 className="text-2xl">Your Points: {userPoints} pts</h2>
      <Points onPoints={handlePoints} />
      <Leaderboard />
    </div>
  );
};

export default Gamification;
