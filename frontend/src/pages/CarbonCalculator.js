import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Paper,
  Box,
  Divider,
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
    publicTransportKm: "",
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

  const COLORS = [
    "#66bb6a",
    "#ffa726",
    "#ff4d4d",
    "#42a5f5",
    "#8e44ad",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#e74c3c",
    "#1abc9c",
    "#7f8c8d",
    "#34495e",
  ];

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateFootprint = () => {
    let total = 0;
    const categories = [];

    const addEmission = (key, multiplier) => {
      const value = parseFloat(inputs[key] || 0) * multiplier;
      total += value;
      categories.push({
        name: key.replace(/([A-Z])/g, " $1"),
        value,
      });
    };

    addEmission("transportKm", 0.12);
    addEmission("publicTransportKm", 0.07);
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

    if (total < 10) setLevel("✅ Safe Level");
    else if (total < 20) setLevel("⚠️ Moderate Level");
    else setLevel("❌ Unsafe Level");
  };

  const renderSuggestions = () => {
    if (level === "✅ Safe Level")
      return "🌱 Great job! Keep maintaining your eco-friendly habits.";
    if (level === "⚠️ Moderate Level")
      return "🚴 You can reduce your footprint by using public transport and minimizing electricity usage.";
    return "⚡ Consider cutting down on high energy usage and reducing waste to lower your footprint.";
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "30px" }}>
      {/* Title Section */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          fontWeight: "bold",
          color: "#1B5E20",
        }}
      >
        🌍 Carbon Footprint Calculator
      </Typography>
      <Typography align="center" color="textSecondary" style={{ marginBottom: "30px" }}>
        Enter your daily activities and discover your environmental impact.
      </Typography>

      {/* Input Section */}
      <Paper
        elevation={3}
        style={{
          padding: "30px",
          background: "linear-gradient(to right, #e8f5e9, #ffffff)",
          borderRadius: "15px",
        }}
      >
        <Grid container spacing={2}>
          {Object.keys(inputs).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                name={key}
                type="number"
                value={inputs[key]}
                onChange={handleChange}
                size="small"
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="success"
            onClick={calculateFootprint}
            style={{
              padding: "10px 25px",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "25px",
            }}
          >
            Calculate 
          </Button>
        </Box>
      </Paper>

      {/* Results Section */}
      {score && (
        <Paper
          elevation={4}
          style={{
            marginTop: "30px",
            padding: "30px",
            background: "linear-gradient(to right, #f1f8e9, #ffffff)",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h5" align="center" style={{ color: "#2E7D32" }}>
             Total Carbon Footprint: {score} kg CO₂e
          </Typography>
          <Typography variant="h6" align="center" style={{ marginTop: "10px" }}>
            {level}
          </Typography>
          <Typography align="center" color="textSecondary" style={{ marginTop: "10px" }}>
            {renderSuggestions()}
          </Typography>

          <Divider style={{ margin: "20px 0" }} />

          {/* Pie Chart */}
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {/* Navigation Button */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 25px",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "25px",
          }}
        >
          Back to Dashboard 
        </Button>
      </Box>
    </Container>
  );
};

export default CarbonCalculator;
