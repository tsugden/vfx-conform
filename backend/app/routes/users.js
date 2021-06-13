// Module imports
const express = require("express");
const router = express.Router();

// Controller imports
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

// Set routes
router.route("/").post(createUser).get(getUsers);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

// Exports
module.exports = router;
