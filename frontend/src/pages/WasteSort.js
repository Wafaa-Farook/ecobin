import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WasteSort = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "20px" }}>Waste Sorting AI</Typography>
      <Typography>Upload an image of waste and get sorting advice.</Typography>

      {/* Add File Upload and AI Sorting Logic Here */}

      <Button variant="contained" color="primary" style={{ marginTop: "20px" }} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default WasteSort;
