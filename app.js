const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const contactRoutes = require("./src/routes/contact");
const swaggerRoutes = require("./src/routes/swagger");
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
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, GET, POST, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
// Enable CORS for all routes
app.use(cors());

// Routes
app.use("/", swaggerRoutes);
app.get("/", (req, res) => {
  //#swagger.tag=['Welcome to the CSE341 Contacts API. Visit /api-docs for documentation.']
  res.send(
    "Welcome to the CSE341 Contacts API. Visit /api-docs for documentation."
  );
});
app.use("/api/contact", contactRoutes);

// Start server
app.listen(PORT, () => {});
