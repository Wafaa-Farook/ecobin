import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // We'll create this next
import WasteSort from "./pages/WasteSort";
import CarbonCalculator from "./pages/CarbonCalculator";
import RecyclingLocator from "./pages/RecyclingLocator";
import EcoTips from './pages/EcoTips';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/waste-sort" element={<WasteSort />} />
        <Route path="/carbon-calculator" element={<CarbonCalculator />} />
        <Route path="/recycling-locator" element={<RecyclingLocator />} />
        <Route path="/eco-tips" element={<EcoTips />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
