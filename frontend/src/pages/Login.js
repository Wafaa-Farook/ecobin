import { useState } from "react";
import { loginWithEmail, loginWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Snackbar, Divider } from "@mui/material";

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
      setSnackbarMessage("❌ User not found! Redirecting to Register...");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/register"), 2000);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setSnackbarMessage("✅ Google Login successful! Redirecting to Dashboard...");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setSnackbarMessage("❌ Google Login failed! Try again.");
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

      <Divider sx={{ my: 3 }}>OR</Divider>

      <Button fullWidth variant="outlined" color="secondary" onClick={handleGoogleLogin}>
        🌐 Login with Google
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
