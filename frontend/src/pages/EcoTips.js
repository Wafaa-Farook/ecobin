import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Paper } from "@mui/material";

const EcoTips = () => {
  const [ecoTip, setEcoTip] = useState("");

  const fetchEcoTip = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/eco-tip");
      const data = await response.json();
      setEcoTip(data.message);
    } catch (error) {
      console.error("❌ Error fetching eco tip:", error);
    }
  };

  useEffect(() => {
    fetchEcoTip();
  }, []);

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">🌍 Eco Tips & Challenges</Typography>
      {ecoTip && (
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", backgroundColor: "#e8f5e9" }}>
          <Typography variant="h6">{ecoTip}</Typography>
        </Paper>
      )}
      <Button variant="contained" color="primary" onClick={fetchEcoTip} style={{ marginTop: "20px" }}>
        🔄 Get New Tip
      </Button>
    </Container>
  );
};

export default EcoTips;
