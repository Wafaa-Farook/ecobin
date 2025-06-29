import { useState } from "react";
import { signUpWithEmail } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Snackbar, Box, Container, Paper } from "@mui/material";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      setSnackbarMessage("✅Registration successful! Redirecting to login...");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/"); // Redirect to login page
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error.message);
      setSnackbarMessage(`❌ Signup failed: ${error.message}`);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" height="100vh">
      {/* Left Section - Image Background */}
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
          color: "white",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Join EcoBin
          </Typography>
          <Typography variant="h6">Cleaner Choices for a Brighter Planet</Typography>
        </Box>
      </Box>

      {/* Right Section - Register Form */}
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
               Register
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
              onClick={handleSignUp}
              sx={{ marginTop: 2 }}
              disabled={loading}
            >
              {loading ? "Registered" : "Register"}
            </Button>

            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Already have an account?{" "}
              <span
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Login here
              </span>
            </Typography>
          </Container>
        </Paper>
      </Box>
    </Box>
  );
}

export default Register;
