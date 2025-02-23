import { useState } from "react";
import { loginWithEmail } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Snackbar, Box, Container, Paper } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      await loginWithEmail(email, password);
      setSnackbarMessage("✅ Login successful! Redirecting to Dashboard...");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Login error:", error.message);
      setSnackbarMessage(`❌ Login failed: ${error.message}`);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box display="flex" height="100vh">
      {/* Right Section - Image */}
      <Box
  sx={{
    flex: 1,
    backgroundImage:
      "url('https://skiphirecomparison.co.uk/wp-content/uploads/2023/07/hand-children-holding-young-plant-with-sunlight-on-green-nature-background-concept-eco-earth-day-stockpack-adobe-stock-scaled.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  }}
>
  {/* Overlay for better text visibility */}
  <Box
    sx={{
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay (adjust opacity as needed)
    }}
  />

  {/* Centered Text Content */}
  <Box
    sx={{
      position: "relative",
      textAlign: "center",
      color: "white",
      zIndex: 1, // Ensures text stays above the overlay
    }}
  >
    <Typography variant="h1" fontWeight="bold">
       EcoBin
    </Typography>
    <Typography variant="h6">
      "Cleaner Choices for a Brighter Planet"
    </Typography>
  </Box>
</Box>


      {/* Left Section - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e8f5e9",
        }}
      >
        <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, width: "350px" }}>
          <Container maxWidth="sm" style={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
               Login
            </Typography>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              message={snackbarMessage}
              onClose={() => setOpenSnackbar(false)}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleEmailLogin}
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>

            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Don't have an account?{' '}
              <span
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </Typography>
          </Container>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
