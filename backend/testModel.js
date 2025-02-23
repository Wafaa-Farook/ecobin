const tf = require('@tensorflow/tfjs-node');
const path = require('path');

const loadTestModel = async () => {
  try {
    const modelPath = path.join(__dirname, "model", "model.json");
    const model = await tf.loadGraphModel(`file://${modelPath}`);
    console.log("✅ Model loaded successfully!");
  } catch (error) {
    console.error("❌ Model loading failed:", error);
  }
};

loadTestModel();
