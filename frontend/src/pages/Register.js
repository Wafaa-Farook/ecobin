import { useState } from "react";
import { TextField, Button, Container, Typography, Snackbar } from "@mui/material";
import { signUpWithEmail } from "../firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password, fullName, phoneNumber, username);
      setSnackbarMessage("Registration successful! Redirecting to login...");
      setOpenSnackbar(true);

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Register</Typography>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
      />

      <TextField fullWidth label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField fullWidth label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button fullWidth variant="contained" color="primary" onClick={handleSignUp}>
        Register
      </Button>
    </Container>
  );
}

export default Register;
