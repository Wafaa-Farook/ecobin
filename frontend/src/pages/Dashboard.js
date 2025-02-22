import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            EcoBin Dashboard
          </Typography>
          <Typography variant="h6" style={{ marginRight: "20px" }}>
            Score: 0 {/* TODO: Replace with dynamic score */}
          </Typography>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Upload & Sort Waste</Typography>
                <Typography variant="body2">Use AI to classify waste items.</Typography>
                <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/waste-sort")}>
                  Go to Waste Sort
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Carbon Footprint Calculator</Typography>
                <Typography variant="body2">Estimate your carbon footprint.</Typography>
                <Button variant="contained" color="secondary" fullWidth onClick={() => navigate("/carbon-calculator")}>
                  Go to Calculator
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Recycling Centers Locator</Typography>
                <Typography variant="body2">Find nearby recycling centers.</Typography>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => navigate("/recycling-locator")}
                    >
                    Find Centers
                </Button>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
