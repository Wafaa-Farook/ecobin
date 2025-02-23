import { useState } from "react";
import { signUpWithGoogle, signUpWithEmail } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Snackbar, Divider } from "@mui/material";

function Register() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      const user = await signUpWithGoogle();
      console.log("Google Signup User:", user); // Debug log to see if the user object is received
  
      if (user) {
        setSnackbarMessage("✅ Google Signup successful! Redirecting to Dashboard...");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/dashboard"), 2000); // Redirect only if user exists
      } else {
        setSnackbarMessage("❌ Google Signup failed! No user returned.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Google signup error:", error); // Full error log
      if (error.code === "auth/popup-closed-by-user") {
        setSnackbarMessage("❌ Google sign-in was canceled. Please try again.");
      } else {
        setSnackbarMessage(`❌ Google Signup failed! ${error.message}`);
      }
      setOpenSnackbar(true);
    }
  };
  
  
  
  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password, username, phoneNumber);
      setSnackbarMessage("✅ Registration successful! Redirecting to login...");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setSnackbarMessage(error.message);
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
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        margin="normal"
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

      <Divider sx={{ my: 3 }}>OR</Divider>

      <Button fullWidth variant="outlined" color="secondary" onClick={handleGoogleSignUp}>
        🌐 Sign Up with Google
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
