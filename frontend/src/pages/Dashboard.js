import { AppBar, Button, Card, CardContent, Container, Grid, Toolbar, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

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
          <Typography variant="h5" fontWeight="bold">EcoBin</Typography>
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

        <Grid container spacing={4} justifyContent="center">
          {[
            { title: "♻️ Upload & Sort Waste", description: "Use AI to classify waste items.", path: "/waste-sort" },
            { title: "🌍 Carbon Calculator", description: "Estimate your carbon footprint.", path: "/carbon-calculator" },
            { title: "📍 Recycling Centers", description: "Find nearby recycling centers.", path: "/recycling-locator" },
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  background: "#fff",
                  borderRadius: "15px",
                  boxShadow: 4,
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                    {service.description}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth onClick={() => navigate(service.path)}>
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <div style={{ backgroundColor: "#1B5E20", padding: "20px", marginTop: "40px", color: "#fff", textAlign: "center" }}>
        <Typography variant="h6">EcoBin © {new Date().getFullYear()} - All Rights Reserved</Typography>
      </div>
    </div>
  );
};

export default Dashboard;
