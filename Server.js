const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: "https://https://tourmaline-eclair-c8ffa2.netlify.app/",
  credentials: true
}));
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/AuthRoutes"));
app.use("/api/contact", require("./routes/Contactroutes"));

// Simple backend check route
app.get("/", (req, res) => {
  res.send("✅ Backend is live");
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
