const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const db = require("./src/config/db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://bite-pass.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow Postman / no-origin
    if (!origin) return callback(null, true);

    // exact match
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // allow all vercel previews
    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const participantRoutes= require("./src/routes/participantRoutes")
const emailRoutes = require("./src/routes/emailRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const initTables = require("./src/config/initTables");

// Initialize Database Tables
(async () => {
  try {
    await initTables();
    console.log("✅ Tables initialized");
  } catch (err) {
    console.error("❌ Init error:", err.message);
  }
})();

// Use routes
app.use("/auth", authRoutes);
app.use("/participants",participantRoutes)
app.use("/emails", emailRoutes);
app.use("/generation",emailRoutes)
app.use("/events", eventRoutes);
app.use("/admin", adminRoutes);

// Optional: Serve frontend static files if they exist (for unified deployments like Render)
const clientBuildPath = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientBuildPath)) {
  console.log("✅ Serving static frontend from:", clientBuildPath);
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
