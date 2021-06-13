const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Please enter a name for the user"],
    maxlength: 20,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email for the user"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password for the user"],
    minlength: 4,
    select: false,
  },
  role: {
    type: String,
    enum: ["editor", "assist", "producer"],
    default: "editor",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ sub: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
