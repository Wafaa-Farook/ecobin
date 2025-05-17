import { Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import * as tmImage from "@teachablemachine/image";
import React, { useEffect, useRef, useState } from "react";

const WasteSort = () => {
  const fileInputRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const modelURL = "https://ecobin-m1pl.onrender.com/model/model.json";

  const metadataURL = "https://ecobin-m1pl.onrender.com/model/metadata.json";

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error loading model:", error);
        setLoading(false);
        setError("Failed to load the model. Please try again.");
      }
    };
    loadModel();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

const handleUpload = async () => {
  if (!image) {
    setError("⚠ No image to upload. Please select an image.");
    return;
  }

  setPrediction("");
  setGuidelines("");
  setError(null);
  setLoadingPrediction(true);

  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch("https://ecobin-m1pl.onrender.com/api/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setLoadingPrediction(false);

    if (data.success) {
      setPrediction(data.prediction);
      setGuidelines(data.guideline);
    } else {
      setError("Prediction failed. Please try again.");
    }
  } catch (error) {
    setLoadingPrediction(false);
    setError("Failed to upload or predict the image. Please try again.");
  }
};
  return (
    <Container
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h3"
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#1B5E20",
        }}
      >
        ♻️ WasteSort AI
      </Typography>
      <Typography
        variant="h6"
        style={{ color: "#555", marginBottom: "30px" }}
      >
        Upload an image of waste and get eco-friendly disposal advice.
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Paper
          elevation={6}
          style={{
            padding: "30px",
            backgroundColor: "#f7fdfc",
            borderRadius: "20px",
            display: "inline-block",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <div style={{
  background: "#e8f5e9",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  maxWidth: "400px",
  margin: "auto"
}}>
          <Button
  variant="contained"
  style={{
    background: "linear-gradient(to right, #1B5E20, #4CAF50)", // Dark green gradient
    border: "1px solid #1B5E20",
    padding: "12px 24px",
    borderRadius: "25px", // Rounded edges
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" // Optional subtle shadow
  }}
  onClick={() => fileInputRef.current && fileInputRef.current.click()}
>
  Upload an Image
</Button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {imagePreview && (
            <div style={{ marginTop: "20px" }}>
              <img
                src={imagePreview}
                alt="Uploaded Waste"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  border: "2px solid #4CAF50",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
          )}

<Button
  variant="contained"
  style={{
    background: "linear-gradient(to right, #1B5E20, #4CAF50)",
    border: "1px solid #1B5E20",
    padding: "12px 24px",
    borderRadius: "25px",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "none",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  }}
  onClick={handleUpload}
  disabled={!image}
>
  Predict Waste Category
</Button>

          </div>
          {loadingPrediction && (
            <CircularProgress style={{ marginTop: "20px" }} />
          )}

          {prediction && (
            <Typography
              variant="h5"
              style={{
                marginTop: "20px",
                color: "#1B5E20",
                fontWeight: "bold",
              }}
            >
              ✅ Predicted Category: {prediction}
            </Typography>
          )}

          {guidelines && (
            <Typography
              variant="body1"
              style={{
                marginTop: "20px",
                backgroundColor: "#E8F5E9",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "left",
                whiteSpace: "pre-line",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {guidelines}
            </Typography>
          )}

          {error && (
            <Typography
              color="error"
              style={{
                marginTop: "20px",
                backgroundColor: "#FFEBEE",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              {error}
            </Typography>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default WasteSort;
