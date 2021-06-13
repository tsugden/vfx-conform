// Module imports
const express = require("express");
const router = express.Router({ mergeParams: true });
const turnoverRouter = require("./turnover");

// Controller imports
const {
  createWatchDirectory,
  getWatchDirectories,
  getWatchDirectory,
  updateWatchDirectory,
  deleteWatchDirectory,
} = require("../controllers/watch");

// Middleware imports
const { protect, authorize } = require("../middleware/auth");

// Re-route into other into other resource routers
router.use("/:watchId/turnover", turnoverRouter);

// Set routes
router.route("/").post(createWatchDirectory).get(getWatchDirectories);

router
  .route("/:id")
  .get(getWatchDirectory)
  .put(updateWatchDirectory)
  .delete(deleteWatchDirectory);

// Export
module.exports = router;
