// Module imports
const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller imports
const {
  getTurnoverDirs,
  getTurnoverDir,
  updateTurnoverDir,
  indexTurnoverDir,
  deleteTurnoverDir,
} = require("../controllers/turnover");

// Middleware imports
const { protect } = require("../middleware/auth");

router.route("/").get(getTurnoverDirs);

router
  .route("/:id")
  .get(getTurnoverDir)
  .put(updateTurnoverDir)
  .delete(deleteTurnoverDir);

router.route("/:id/index").put(indexTurnoverDir);

// Export
module.exports = router;
