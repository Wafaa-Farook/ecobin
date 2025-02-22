import { useState } from "react";
import { createUserWithEmailAndPassword, auth } from "../firebase";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to Dashboard after registration
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center">Create Account</Typography>
        <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
