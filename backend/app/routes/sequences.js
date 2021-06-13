// Module imports
const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller imports
const { getSequences } = require("../controllers/sequences");

// Set routes
router.route("/").get(getSequences);

// Exports
module.exports = router;
