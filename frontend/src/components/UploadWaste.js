import { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db, auth } from "../firebase";

function UploadWaste({ setScore }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please upload an image!");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/classify", formData);
      setResult(res.data.classification);

      // Update Score in Firebase
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { score: increment(10) });
        setScore((prev) => prev + 10);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Typography>Select an image of waste:</Typography>
      <TextField type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginTop: 10 }}>Upload</Button>
      <Typography style={{ marginTop: 10 }}>Classification: {result}</Typography>
    </div>
  );
}

export default UploadWaste;
