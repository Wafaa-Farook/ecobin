import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

const WasteSort = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const modelURL = "/model/model.json"; // Your model folder
  const metadataURL = "/model/metadata.json";

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        setLoading(false);
        console.log("✅ Model loaded successfully!");
      } catch (error) {
        console.error("❌ Error loading model:", error);
        setLoading(false);
      }
    };
    loadModel();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    setImagePreview(img.src);

    img.onload = async () => {
      const prediction = await model.predict(img);
      console.log("🔥 Full Prediction:", prediction);

      const highestPrediction = prediction.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );

      setPrediction(
        `${highestPrediction.className} (${(highestPrediction.probability * 100).toFixed(2)}%)`
      );
    };
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">🗑️ Waste Sorting AI</Typography>
      <Typography style={{ marginBottom: "20px" }}>
        Upload an image of waste and get sorting advice.
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInputRef.current.click()}
            style={{ marginRight: "10px" }}
          >
            Upload Waste Image
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>

          {imagePreview && (
            <div style={{ marginTop: "20px" }}>
              <img
                src={imagePreview}
                alt="Uploaded Waste"
                style={{ width: "200px", borderRadius: "10px" }}
              />
            </div>
          )}

          {prediction && (
            <Typography
              variant="h6"
              style={{
                marginTop: "20px",
                color: "#4CAF50",
                fontWeight: "bold",
              }}
            >
              Predicted Category: {prediction}
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default WasteSort;
