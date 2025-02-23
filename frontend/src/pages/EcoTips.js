import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Paper, Box } from "@mui/material";

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
    <Container
      style={{
        textAlign: "center",
        marginTop: "50px",
        background: "linear-gradient(to right, #E8F5E9, #C8E6C9)",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(76, 175, 80, 0.2)",
      }}
    >
      <Typography
        variant="h3"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          color: "#1B5E20",
        }}
      >
        Eco Tips for a Greener Tomorrow
      </Typography>

      {ecoTip && (
        <Paper
          elevation={5}
          style={{
            padding: "25px",
            marginTop: "30px",
            backgroundColor: "#A5D6A7",
            borderRadius: "15px",
            color: "#1B5E20",
            fontStyle: "italic",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" style={{ lineHeight: "1.8" }}>
            🌱 {ecoTip}
          </Typography>
        </Paper>
      )}

      <Button
        variant="contained"
        style={{
          marginTop: "30px",
          background: "linear-gradient(to right, #1B5E20, #4CAF50)",
          padding: "12px 24px",
          borderRadius: "25px",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          textTransform: "none",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        onClick={fetchEcoTip}
      >
        Inspire Me with a New Tip
      </Button>

      <Box
        style={{
          marginTop: "40px",
          fontSize: "14px",
          color: "#388E3C",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        💡 Small steps make a big difference. Let’s keep our planet green! 🌍
      </Box>
    </Container>
  );
};

export default EcoTips;
