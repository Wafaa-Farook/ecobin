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
      setSnackbarMessage("Login successful! Redirecting to Dashboard...");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setSnackbarMessage("User not found! Redirecting to Register...");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/register"), 2000);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Login</Typography>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
      />

      <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button fullWidth variant="contained" color="primary" onClick={handleEmailLogin}>
        Login
      </Button>
    </Container>
  );
}

export default Login;
