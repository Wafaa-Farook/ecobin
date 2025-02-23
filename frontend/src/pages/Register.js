import { useState } from "react";
import { signUpWithEmail } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Snackbar } from "@mui/material";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
      setSnackbarMessage("✅ Registration successful! Redirecting to login...");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Signup error:", error.message);
      setSnackbarMessage(`❌ Signup failed: ${error.message}`);
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>🌱 EcoBin Register</Typography>

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

      <Button fullWidth variant="contained" color="primary" onClick={handleSignUp} style={{ marginTop: "20px" }}>
        Register
      </Button>

      <Typography variant="body2" style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <span style={{ color: "green", cursor: "pointer" }} onClick={() => navigate("/")}>
          Login here
        </span>
      </Typography>
    </Container>
  );
}

export default Register;
