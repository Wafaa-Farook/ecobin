import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // We'll create this next
import WasteSort from "./pages/WasteSort";
import CarbonCalculator from "./pages/CarbonCalculator";
import RecyclingLocator from "./pages/RecyclingLocator";
import Points from "./pages/Points.js";
import Leaderboard from "./pages/Leaderboard.js";
import Gamification from "./pages/Gamification.js";
function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/waste-sort" element={<WasteSort />} />
        <Route path="/carbon-calculator" element={<CarbonCalculator />} />
        <Route path="/recycling-locator" element={<RecyclingLocator />} />
        <Route path="/Points" element={<Points />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Gamification" element={<Gamification />} />
      </Routes>
    </Router>
  );
}

export default App;
