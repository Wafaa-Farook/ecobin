import { useState, useEffect } from "react";
import { auth, db, signOut } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import UploadWaste from "../components/UploadWaste";
import CarbonCalculator from "../components/CarbonCalculator";
import RecyclingLocator from "../components/RecyclingLocator";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        const userRef = collection(db, "users");
        const userSnapshot = await getDocs(userRef);
        userSnapshot.forEach((doc) => {
          if (doc.id === auth.currentUser.uid) {
            setScore(doc.data().score || 0);
          }
        });
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Container>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>EcoBin Dashboard</Typography>
          <Typography variant="h6" style={{ marginRight: 20 }}>Score: {score}</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Main Dashboard Content */}
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Upload & Sort Waste</Typography>
              <UploadWaste setScore={setScore} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Carbon Footprint Calculator</Typography>
              <CarbonCalculator setScore={setScore} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recycling Centers Locator</Typography>
              <RecyclingLocator />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
