import React, { useState } from "react";
import { Button, Container, Typography, TextField, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CarbonCalculator = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    transportKm: "",
    electricityKwh: "",
    electricityHours: "",
    gasUsageinLitre: "",
    wasteGeneratedInKg: "",
    waterUsageInLitre: "",
    plasticUsageInKg: "",
    meatConsumptionInKg: "",
    paperUsageInKg: "",
    airTravelHours: "",
    internetUsageHours: "",
    applianceUsageHours: "",
    clothingPurchases: "",
  });
  const [score, setScore] = useState(null);
  const [level, setLevel] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateFootprint = () => {
    let total = 0;
    total += parseFloat(inputs.transportKm || 0) * 0.12;
    total += parseFloat(inputs.electricityKwh || 0) * 0.5;
    total += parseFloat(inputs.electricityHours || 0) * 0.2;
    total += parseFloat(inputs.gasUsage || 0) * 2.3;
    total += parseFloat(inputs.wasteGenerated || 0) * 0.15;
    total += parseFloat(inputs.waterUsage || 0) * 0.05;
    total += parseFloat(inputs.plasticUsage || 0) * 1.2;
    total += parseFloat(inputs.meatConsumption || 0) * 2.0;
    total += parseFloat(inputs.paperUsage || 0) * 0.1;
    total += parseFloat(inputs.airTravelHours || 0) * 0.25;
    total += parseFloat(inputs.heatingUsage || 0) * 0.4;
    total += parseFloat(inputs.coolingUsage || 0) * 0.3;
    total += parseFloat(inputs.internetUsage || 0) * 0.05;
    total += parseFloat(inputs.applianceUsage || 0) * 0.1;
    total += parseFloat(inputs.clothingPurchases || 0) * 0.07;

    setScore(total.toFixed(2));

    if (total < 50) setLevel("Safe Level");
    else if (total < 150) setLevel("Moderate Level");
    else setLevel("Unsafe Level");
  };

  const renderSuggestions = () => {
    if (level === "Safe Level") return "Great job! Keep maintaining your eco-friendly habits.";
    if (level === "Moderate Level") return "You can reduce your carbon footprint by using public transport more and minimizing electricity usage.";
    return "Consider cutting down on high energy usage and reducing waste to lower your footprint.";
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "20px" }}>Carbon Footprint Calculator</Typography>
      <Typography>Enter your daily activities to estimate your carbon footprint.</Typography>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {Object.keys(inputs).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              label={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
              name={key}
              type="number"
              value={inputs[key]}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" onClick={calculateFootprint} style={{ marginTop: "20px" }}>
        Calculate
      </Button>

      {score && (
        <Paper style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h6">Total Carbon Footprint: {score} kg CO₂e</Typography>
          <Typography variant="subtitle1">Level: {level}</Typography>
          <Typography>{renderSuggestions()}</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: "Carbon Footprint", value: parseFloat(score) }]}> 
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={level === "Unsafe Level" ? "#ff4d4d" : level === "Moderate Level" ? "#ffa726" : "#66bb6a"} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}

      <Button variant="contained" color="secondary" style={{ marginTop: "20px" }} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default CarbonCalculator;
