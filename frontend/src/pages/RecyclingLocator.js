import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

const RecyclingLocator = () => {
  const [position, setPosition] = useState([28.6139, 77.209]); // Default (Delhi)
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch recycling centers using Overpass API
  const fetchCenters = async (lat, lon) => {
    const query = `
      [out:json];
      (
        node["amenity"="recycling"](${lat - 0.1}, ${lon - 0.1}, ${lat + 0.1}, ${lon + 0.1});
        node["amenity"="waste_disposal"](${lat - 0.1}, ${lon - 0.1}, ${lat + 0.1}, ${lon + 0.1});
      );
      out;
    `;

    try {
      const response = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query
      );

      if (response.data.elements.length) {
        const centersData = response.data.elements.map((el) => ({
          name: el.tags.name || "Recycling Center",
          coordinates: [el.lat, el.lon],
        }));
        setCenters(centersData);
      } else {
        setCenters([
          { name: "EcoWaste Solutions Delhi", coordinates: [28.6448, 77.216] },
          { name: "Mumbai E-Waste Hub", coordinates: [19.076, 72.8777] },
          { name: "Green Recycling Kochi", coordinates: [9.9312, 76.2673] },
        ]);
      }
    } catch (error) {
      console.error("Error fetching recycling centers:", error);
    }
  };

  // Search location
  const searchLocation = async () => {
    if (!search) return alert("⚠️ Please enter a location!");

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );

      if (res.data.length) {
        const lat = parseFloat(res.data[0].lat);
        const lon = parseFloat(res.data[0].lon);
        setPosition([lat, lon]);
        fetchCenters(lat, lon);
      } else {
        alert("❌ Location not found!");
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 12);
    return null;
  };

  useEffect(() => {
    fetchCenters(position[0], position[1]);
  }, []);

  return (
    <Container
      style={{
        textAlign: "center",
        marginTop: "30px",
        background: "linear-gradient(to right, #E8F5E9, #C8E6C9)",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(76, 175, 80, 0.2)",
      }}
    >
      <Typography
        variant="h3"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          color: "#1B5E20",
          marginBottom: "20px",
        }}
      >
        Find Recycling Centers Near You
      </Typography>

      <Paper
  elevation={3}
  style={{
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "#A5D6A7",
    display: "inline-block",
  }}
>
  <TextField
    label="Search location..."
    variant="outlined"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      backgroundColor: "white",
      borderRadius: "8px",
      marginBottom: "10px",
      width: "300px", // Shortened width
    }}
  />
  <Button
    variant="contained"
    style={{
      background: "linear-gradient(to right, #1B5E20, #4CAF50)",
      color: "white",
      padding: "10px 20px",
      fontWeight: "bold",
      textTransform: "none",
      borderRadius: "25px",
      marginLeft: "10px",
    }}
    onClick={searchLocation}
  >
     Search
  </Button>
</Paper>

      {/* Map Container */}
      <MapContainer
        center={position}
        zoom={12}
        style={{
          height: "70vh",
          width: "100%",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ChangeMapView coords={position} />
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {centers.map((center, idx) => (
          <Marker key={idx} position={center.coordinates} icon={customIcon}>
            <Popup>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {center.name}
              </Typography>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <Typography
        style={{
          marginTop: "30px",
          color: "#388E3C",
          fontStyle: "italic",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        ♻️ Let’s work together for a cleaner, greener planet!
      </Typography>
    </Container>
  );
};

export default RecyclingLocator;
