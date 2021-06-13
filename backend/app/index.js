// Imports
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB, disconnectDB } = require("./db/db");
const error = require("./middleware/error");

// Connect to database
connectDB();

// Initialise server
const app = express();

// Middleware...

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// Route files
const {
  projectRouter: projects,
  projectIdRouter: projectIds,
} = require("./routes/projects");
const users = require("./routes/users");
const auth = require("./routes/auth");
const watch = require("./routes/watch");
const turnover = require("./routes/turnover");
const files = require("./routes/files");
const sequences = require("./routes/sequences");

// Mount routes
app.use("/api/v1/project", projects);
app.use("/api/v1/projectId", projectIds);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api/v1/watch", watch);
app.use("/api/v1/turnover", turnover);
app.use("/api/v1/files", files);
app.use("/api/v1/sequences", sequences);

// Error handler
app.use(error);

// Set port
const PORT = 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error (unhandled rejection): ${err.message}`);
  // Close server and exit process
  disconnectDB();
  server.close(() => process.exit(1));
});
