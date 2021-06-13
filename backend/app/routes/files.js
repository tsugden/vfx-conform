// Module imports
const express = require("express");
const router = express.Router();

// Controller imports
const { getFiles, getFile, deleteFiles } = require("../controllers/files");

// Middleware imports
const { protect, authorize } = require("../middleware/auth");

// Re-route into other into other resource routers
router.route("/").get(getFiles).delete(protect, deleteFiles);

router.route("/:id").get(getFile);

// Exports
module.exports = router;
