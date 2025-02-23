import { Button, CircularProgress, Container, Typography } from "@mui/material";
import * as tmImage from "@teachablemachine/image";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const WasteSort = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [guidelines, setGuidelines] = useState(""); // <-- Add guidelines state
  const [loading, setLoading] = useState(true);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const modelURL = "http://localhost:5000/model/model.json";
  const metadataURL = "http://localhost:5000/model/metadata.json";

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
        setError("Failed to load the model. Please try again.");
      }
    };
    loadModel();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setPrediction("");
    setGuidelines("");

    setError(null);
    setLoadingPrediction(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("📦 Backend response:", data); 
      setLoadingPrediction(false);

      if (data.success) {
        setImagePreview(URL.createObjectURL(file));
        setPrediction(data.prediction);
        setGuidelines(data.guideline);
        console.log("📝 Setting guidelines:", data.guideline);
setGuidelines(data.guideline); // <-- Set guidelines from response
      } else {
        setError("Prediction failed. Please try again.");
      }
    } catch (error) {
      setLoadingPrediction(false);
      console.error("❌ Error uploading file:", error);
      setError("Failed to upload or predict the image. Please try again.");
    }
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

          {loadingPrediction && <CircularProgress style={{ marginTop: "20px" }} />}

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

{guidelines ? (
  <Typography
    variant="body1"
    style={{
      marginTop: "20px",
      backgroundColor: "#f0f4f8",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "left",
      whiteSpace: "pre-line",
    }}
  >
    {guidelines}
  </Typography>
) : prediction && (
  <Typography
    variant="body1"
    style={{
      marginTop: "20px",
      color: "#FF5722", // Just for visibility, you can change this
    }}
  >
    ⚠️ No guidelines available for this category.
  </Typography>
)}

{error && (
  <Typography color="error" style={{ marginTop: "20px" }}>
    {error}
  </Typography>
)}

        </>
      )}
    </Container>
  );
};

export default WasteSort;
