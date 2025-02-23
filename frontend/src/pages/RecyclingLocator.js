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

// Custom marker icon for clarity
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
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
    if (!search) return alert("Enter a location!");

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
        alert("Location not found!");
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
    <div>
      <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchLocation}>Search</button>
      </div>

      {/* Map Container */}
      <MapContainer center={position} zoom={12} style={{ height: "80vh", width: "100%" }}>
        <ChangeMapView coords={position} />
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {centers.map((center, idx) => (
          <Marker key={idx} position={center.coordinates} icon={customIcon}>
            <Popup>{center.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RecyclingLocator;
