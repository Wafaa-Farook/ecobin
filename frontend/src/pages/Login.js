import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"; // Ensure firebase is correctly set up
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔹 Email & Password Login
  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard"); // Redirect after Google login
    } catch (err) {
      setError("Google Sign-In Failed.");
    }
  };

  // 🔹 Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("Failed to send password reset email.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Login</Typography>

      {error && <Alert severity="error" style={{ marginBottom: "10px" }}>{error}</Alert>}

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button fullWidth variant="contained" color="primary" onClick={handleEmailLogin}>
        Login
      </Button>

      <Button fullWidth variant="contained" color="secondary" onClick={handleGoogleLogin} style={{ marginTop: "10px" }}>
        Sign in with Google
      </Button>

      <Button fullWidth variant="text" color="primary" onClick={handleForgotPassword} style={{ marginTop: "10px" }}>
        Forgot Password?
      </Button>

      <Typography variant="body2" style={{ marginTop: "10px" }}>
        Don't have an account? <a href="/register">Register here</a>
      </Typography>
    </Container>
  );
}

export default Login;