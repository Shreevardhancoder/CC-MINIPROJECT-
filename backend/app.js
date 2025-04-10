const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const functionRoutes = require("./api/routes/functionRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/functions", functionRoutes);

// Optional health check/warm-up route
app.get("/warmup", (req, res) => {
  res.send("🔥 Server is warm and ready!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("==================================");
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log("📦 API endpoint: /api/functions");
  console.log("==================================");
});
