import { Button, CircularProgress, Container, Typography } from "@mui/material";
import * as tmImage from "@teachablemachine/image";
import { getAuth } from "firebase/auth";
import { getUserScore, updateUserScore, getLeaderboard } from "../services/pointsService";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const WasteSort = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);

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
    processImage(file);
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImagePreview(imageSrc);
      processImage(imageSrc, true);
    }
  };

  const processImage = async (image, isBase64 = false) => {
    setPrediction("");
    setGuidelines("");
    setError(null);
    setLoadingPrediction(true);
    
    const formData = new FormData();
    if (isBase64) {
      const blob = await fetch(image).then((res) => res.blob());
      formData.append("image", blob);
    } else {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/predict", {
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
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">🗑️ Waste Sorting AI</Typography>
      <Typography style={{ marginBottom: "20px" }}>
        Upload or capture an image of waste to get sorting advice.
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Image
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setUseWebcam(!useWebcam)}
            >
              {useWebcam ? "Use File Upload" : "Use Webcam"}
            </Button>
          </div>

          {useWebcam ? (
            <>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
              />
              <Button
                variant="contained"
                color="success"
                style={{ marginTop: "10px" }}
                onClick={captureImage}
              >
                Capture Image
              </Button>
            </>
          ) : (
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          )}

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
            <Typography variant="h6" style={{ marginTop: "20px", color: "#4CAF50", fontWeight: "bold" }}>
              Predicted Category: {prediction}
            </Typography>
          )}

          {guidelines ? (
            <Typography
              variant="body1"
              style={{ marginTop: "20px", backgroundColor: "#f0f4f8", padding: "15px", borderRadius: "10px", textAlign: "left", whiteSpace: "pre-line" }}
            >
              {guidelines}
            </Typography>
          ) : prediction && (
            <Typography variant="body1" style={{ marginTop: "20px", color: "#FF5722" }}>
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
