import React, { useState } from "react";
import { getUserScore, updateUserScore, getLeaderboard } from "../services/pointsService";

import {
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CarbonCalculator = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    transportKm: "",
    electricityKwh: "",
    electricityHours: "",
    gasUsage: "",
    wasteGenerated: "",
    waterUsage: "",
    plasticUsage: "",
    meatConsumption: "",
    paperUsage: "",
    airTravelHours: "",
    heatingUsage: "",
    coolingUsage: "",
    internetUsage: "",
    applianceUsage: "",
    clothingPurchases: "",
  });

  const [score, setScore] = useState(null);
  const [level, setLevel] = useState("");
  const [chartData, setChartData] = useState([]);

  const COLORS = ["#66bb6a", "#ffa726", "#ff4d4d", "#42a5f5", "#8e44ad", "#f39c12", "#d35400", "#c0392b", "#2ecc71", "#3498db", "#9b59b6", "#e74c3c", "#1abc9c", "#7f8c8d", "#34495e"];

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateFootprint = () => {
    let total = 0;
    const categories = [];

    const addEmission = (key, multiplier) => {
      const value = parseFloat(inputs[key] || 0) * multiplier;
      total += value;
      categories.push({ name: key.replace(/([A-Z])/g, " $1"), value });
    };

    addEmission("transportKm", 0.12);
    addEmission("PublicTransport",0.07);
    addEmission("electricityKwh", 0.5);
    addEmission("electricityHours", 0.2);
    addEmission("gasUsage", 2.3);
    addEmission("wasteGenerated", 0.15);
    addEmission("waterUsage", 0.05);
    addEmission("plasticUsage", 1.2);
    addEmission("meatConsumption", 2.0);
    addEmission("paperUsage", 0.1);
    addEmission("airTravelHours", 0.25);
    addEmission("heatingUsage", 0.4);
    addEmission("coolingUsage", 0.3);
    addEmission("internetUsage", 0.05);
    addEmission("applianceUsage", 0.1);
    addEmission("clothingPurchases", 0.07);

    setScore(total.toFixed(2));
    setChartData(categories);

    if (total < 50) setLevel("Safe Level");
    else if (total < 150) setLevel("Moderate Level");
    else setLevel("Unsafe Level");
  };

  const renderSuggestions = () => {
    if (level === "Safe Level")
      return "✅ Great job! Keep maintaining your eco-friendly habits.";
    if (level === "Moderate Level")
      return "⚠️ You can reduce your carbon footprint by using public transport more and minimizing electricity usage.";
    return "❌ Consider cutting down on high energy usage and reducing waste to lower your footprint.";
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "20px" }}>
        Carbon Footprint Calculator
      </Typography>
      <Typography>
        Enter your daily activities to estimate your carbon footprint.
      </Typography>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {Object.keys(inputs).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              name={key}
              type="number"
              value={inputs[key]}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={calculateFootprint}
        style={{ marginTop: "20px" }}
      >
        Calculate
      </Button>

      {score && (
        <Paper style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h6">
            🌍 Total Carbon Footprint: {score} kg CO₂e
          </Typography>
          <Typography variant="subtitle1">📊 Level: {level}</Typography>
          <Typography>{renderSuggestions()}</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      )}

      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default CarbonCalculator;

