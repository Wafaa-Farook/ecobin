import { AppBar, Button, CardContent, Container, Grid, Toolbar, Typography, Box } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import EcoTips from "./EcoTips"; // New component

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #2F7A34FF, #388E3C)", padding: "10px 0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold"></Typography>
          <Button color="secondary" variant="contained" sx={{ borderRadius: "20px" }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Header Section with Image */}
      <div
        style={{
          background: `url('https://skiphirecomparison.co.uk/wp-content/uploads/2023/07/hand-children-holding-young-plant-with-sunlight-on-green-nature-background-concept-eco-earth-day-stockpack-adobe-stock-scaled.jpg') center/cover no-repeat`,
          height: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay effect
          }}
        ></div>
        <Typography variant="h2" fontWeight="bold" zIndex={1}>
          EcoBin
        </Typography>
      </div>

      {/* Services Section */}
      <Container sx={{ marginTop: "40px" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" gutterBottom>
          Cleaner Choices for a Brighter Planet
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap", // allow stacking
            justifyContent: "center",
            gap: "20px",
            padding: "10px",
          }}
        >

        
          {[
            { title: "♻️ Upload & Sort Waste", description: "Use AI to classify waste items.", path: "/waste-sort" },
            { title: "🌍 Carbon Footprint Calculator", description: "Estimate your carbon footprint.", path: "/carbon-calculator" },
            { title: "📍 Recycling Centers", description: "Find nearby recycling centers.", path: "/recycling-locator" },
            { title: "🌱 Eco Tips", description: "Learn simple ways to live sustainably!", path: "/eco-tips" },
          ].map((service, index) => (
            <Box
                key={index}
                onClick={() => navigate(service.path)}
                sx={{
                  background: "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 15px rgba(46, 125, 50, 0.5)",
                  border: "2px solid #2E7D32",
                  textAlign: "center",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  minWidth: "250px",
                  maxWidth: "300px",
                  flex: "1 1 250px", // allow responsive wrap
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 20px rgba(46, 125, 50, 0.8)",
                  },
                }}
              >

              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                  {service.description}
                </Typography>
              </CardContent>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Footer */}
      <div style={{ backgroundColor: "#1B5E20", padding: "20px", marginTop: "40px", color: "#fff", textAlign: "center" }}>
        <Typography variant="h6">EcoBin © {new Date().getFullYear()} - All Rights Reserved</Typography>
      </div>
    </div>
  );
};

// Add the route for Eco Tips
const AppRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/eco-tips" element={<EcoTips />} />
  </Routes>
);

export default Dashboard;
