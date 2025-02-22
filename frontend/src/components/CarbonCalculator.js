import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db, auth } from "../firebase";

function CarbonCalculator({ setScore }) {
  const [carbon, setCarbon] = useState(0);

  const calculateCarbon = () => {
    const randomScore = Math.floor(Math.random() * 50) + 10; // Mock Calculation
    setCarbon(randomScore);

    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      updateDoc(userRef, { score: increment(20) });
      setScore((prev) => prev + 20);
    }
  };

  return (
    <div>
      <Typography>Enter daily travel distance (km):</Typography>
      <TextField type="number" fullWidth />
      <Button variant="contained" color="secondary" onClick={calculateCarbon} style={{ marginTop: 10 }}>Calculate</Button>
      <Typography style={{ marginTop: 10 }}>Your Carbon Footprint: {carbon} kg CO₂</Typography>
    </div>
  );
}

export default CarbonCalculator;
