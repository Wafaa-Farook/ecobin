import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32", // Dark Green
    },
    secondary: {
      main: "#4CAF50", // Light Green
    },
    background: {
      default: "#F5F5F5", // Light Gray Background
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;
