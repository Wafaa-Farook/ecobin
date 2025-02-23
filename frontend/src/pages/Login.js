import { useState } from "react";
import { loginWithEmail } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Snackbar } from "@mui/material";

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
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>🌱 EcoBin Login</Typography>

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

      <Button fullWidth variant="contained" color="primary" onClick={handleEmailLogin} style={{ marginTop: "20px" }}>
        Login
      </Button>

      <Typography variant="body2" style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <span style={{ color: "green", cursor: "pointer" }} onClick={() => navigate("/register")}>
          Register here
        </span>
      </Typography>
    </Container>
  );
}

export default Login;
