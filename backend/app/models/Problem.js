const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  ancestors: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
  parent: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Problem", ProblemSchema);
