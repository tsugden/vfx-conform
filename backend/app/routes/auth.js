const express = require("express");
const router = express.Router();

const { login, logout, getMe } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.route("/login").post(login);
router.route("/logout").get(protect, logout);
router.route("/me").get(protect, getMe);

module.exports = router;
