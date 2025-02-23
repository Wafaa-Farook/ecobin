require("dotenv").config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
global.fetch = fetch;

const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const tf = require("@tensorflow/tfjs-node");


const app = express();
const PORT = process.env.PORT || 5000;
console.log("Firebase API Key:", process.env.FIREBASE_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/model", express.static(path.join(__dirname, "model")));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Load model and class labels
let model;
let classLabels = [];

const loadModel = async () => {
  try {
    const modelPath = `file://${path.join(__dirname, "model", "model.json")}`;
    model = await tf.loadLayersModel(modelPath);
    console.log("✅ Model loaded successfully!");

    const metadataPath = path.join(__dirname, "model", "metadata.json");
    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    classLabels = metadata.labels || [];
    console.log("📝 Class labels loaded:", classLabels);
  } catch (error) {
    console.error("❌ Error loading model or metadata:", error);
  }
};
loadModel();

// Disposal guidelines
const guidelines = {
  "Recyclable": `🌀 Recyclable Waste
♻️ What’s Included: Paper, cardboard, plastic bottles, glass jars, aluminum cans, clean packaging materials.

🌱 Why Recycle?
Recycling saves energy, conserves resources, and reduces pollution — it’s one of the simplest ways to care for the planet.

✅ Best & Most Efficient Disposal Methods:
- Clean Before You Green: Rinse out any food or liquid from bottles, cans, and containers before recycling.
- Sort Like a Pro: Separate your recyclables — paper, glass, plastics, and metals should each go into their own bin.
- Flatten & Save Space: Crush cans and flatten cardboard boxes — you’ll maximize bin space.
🚫 Avoid:
- Greasy pizza boxes
- Wet or dirty paper
- Broken glass (check local guidelines)`,

  "Non-Recyclable": `🚫 Non-Recyclable Waste
❌ What’s Included: Styrofoam, plastic wraps, used tissues, broken ceramics, mixed-material packaging (like chip bags).

🌎 Why It Matters:
Non-recyclables clog recycling systems and increase landfill waste.

✅ Best & Most Efficient Disposal Methods:
- Reduce First: Choose reusable bags, bottles, and containers.
- Wrap it Right: For sharp objects like broken glass, wrap them safely before disposing.
- Minimize Use: Switch from single-use plastics to sustainable alternatives.
🚫 Avoid:
- Throwing non-recyclables into recycling bins.
- Mixing non-recyclables with organic waste.`,

  "E-Waste": `⚡ E-Waste (Electronic Waste)
🔌 What’s Included: Old phones, laptops, chargers, batteries, broken gadgets.

🌍 Why Recycle E-Waste?
E-waste contains harmful chemicals but also valuable materials that can be reused.

✅ Best & Most Efficient Disposal Methods:
- Donate or sell working devices.
- Use e-waste collection points at electronics stores.
- Tape battery ends before disposal.
🚫 Avoid:
- Dumping electronics in regular bins.
- Storing old devices forever — recycle them!`,

  "Organic": `🌿 Organic Waste
🍃 What’s Included: Fruit peels, vegetable scraps, coffee grounds, eggshells.

🌱 Why Compost?
Composting reduces methane emissions and creates fertile soil.

✅ Best & Most Efficient Disposal Methods:
- Set up a compost bin or use community composting programs.
- Balance “greens” (food scraps) and “browns” (dry leaves, paper).
- Avoid meat, dairy, and cooked foods in compost.
🚫 Avoid:
- Oily or cooked foods.
- Plastic-coated paper products.`,
};

// Route to handle image upload and prediction
app.post("/api/predict", upload.single("image"), async (req, res) => {
  try {
    if (!model) {
      return res.status(500).json({ success: false, message: "Model not loaded yet." });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    console.log("🖼️ Image uploaded:", imagePath);

    const imageBuffer = fs.readFileSync(path.join(__dirname, "uploads", req.file.filename));
    const imageTensor = tf.node.decodeImage(imageBuffer)
      .resizeNearestNeighbor([224, 224])
      .expandDims(0)
      .toFloat()
      .div(tf.scalar(255));

    const predictions = await model.predict(imageTensor).array();
    const highestPredictionIndex = predictions[0].indexOf(Math.max(...predictions[0]));
    const className = classLabels[highestPredictionIndex] || "Unknown";
    const probability = predictions[0][highestPredictionIndex];

    const prediction = `${className} (${(probability * 100).toFixed(2)}%)`;
    const guideline = guidelines[className] || "No guidelines available for this category.";

    res.json({
      success: true,
      imagePath,
      prediction,
      guideline, // Sending the correct guideline!
    });
  } catch (error) {
    console.error("❌ Error in prediction:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
const ecoTips = [
  "💡 Turn off lights and unplug devices when not in use.",
  "🌱 Start composting your kitchen waste to reduce landfill.",
  "🚴‍♂️ Use a bike or walk for short distances instead of driving.",
  "👜 Carry reusable shopping bags and water bottles.",
  "♻️ Separate your waste into recyclables and non-recyclables.",
  "🚿 Take shorter showers to conserve water.",
  "🌍 Use energy-efficient LED bulbs and appliances.",
  "🧴 Refill and reuse containers to cut down on plastic waste.",
  "📦 Choose products with minimal or eco-friendly packaging.",
  "🌳 Plant a tree or maintain a small home garden.",
  "📚 Donate old books, clothes, and electronics instead of trashing them.",
  "🚌 Use public transportation or carpool to reduce carbon emissions.",
  "🍽️ Avoid single-use plastic cutlery and straws.",
  "🥗 Eat more plant-based meals to reduce your carbon footprint.",
  "🧼 Use biodegradable and non-toxic cleaning products.",
  "🌊 Avoid wasting water while brushing or washing dishes.",
  "🛒 Support local farmers and buy seasonal produce.",
  "☕ Bring your own reusable cup to coffee shops.",
  "🔋 Switch to rechargeable batteries to reduce e-waste.",
  "🌞 Make the most of natural sunlight instead of electric lighting.",
  "📧 Go paperless by opting for digital receipts and statements.",
  "🎁 Wrap gifts in reusable cloth or newspaper instead of plastic wrap.",
  "👗 Upcycle or donate old clothes instead of throwing them away.",
  "🌬️ Use fans and open windows instead of air conditioning when possible.",
  "📱 Recycle old phones and gadgets through e-waste programs.",
  "🍽️ Reduce food waste by planning your meals and storing food properly."
];


app.get("/api/eco-tip", (req, res) => {
  const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
  res.json({ message: randomTip });
});
// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));