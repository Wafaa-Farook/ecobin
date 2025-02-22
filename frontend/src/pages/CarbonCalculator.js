import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CarbonCalculator = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "20px" }}>Carbon Footprint Calculator</Typography>
      <Typography>Enter your daily activities to estimate your carbon footprint.</Typography>

      {/* Add Carbon Calculator Form Here */}

      <Button variant="contained" color="secondary" style={{ marginTop: "20px" }} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default CarbonCalculator;
