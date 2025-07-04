const express = require("express");
const cors = require("cors");
const app = express();
const env = require("dotenv").config();
const contactRoutes = require("./src/routes/contact");
const db = require("./src/data/db");

const PORT = process.env.PORT;

// Initialize database connection
db.intializeDb((err) => {
  if (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1); // Exit the application if database initialization fails
  } else {
    console.log("Database initialized successfully");
  }
});
// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes
app.use("/api/contact", contactRoutes);

// Start server
app.listen(PORT, () => {});
