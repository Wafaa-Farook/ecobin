import { useState } from "react";
import { signUpWithEmail, signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
      navigate("/dashboard"); // Redirect after sign-up
    } catch (error) {
      alert("Sign-Up Failed: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard"); // Redirect after Google sign-up
    } catch (error) {
      alert("Google Sign-Up Failed: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Register</Typography>

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

      <Button fullWidth variant="contained" color="primary" onClick={handleSignUp}>
        Register
      </Button>

      <Button fullWidth variant="contained" color="secondary" onClick={handleGoogleSignUp} style={{ marginTop: "10px" }}>
        Sign up with Google
      </Button>

      <Typography variant="body2" style={{ marginTop: "10px" }}>
        Already have an account? <a href="/login">Login here</a>
      </Typography>
    </Container>
  );
}

export default Register;
