const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    maxlength: 100,
    required: [true, "Please give the project a name"],
  },
  nickname: {
    type: String,
    trim: true,
    maxlength: 10,
    required: [true, "Please give the project a nickname"],
    index: { unique: true }, // TODO: check this is right
  },
  ancestors: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
  parent: {
    type: mongoose.Schema.ObjectId,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Cascade delete folders when a project is deleted
ProjectSchema.pre("remove", async function (next) {
  Promise.all([
    this.model("Directory").deleteMany({
      ancestors: this._id,
    }),
    this.model("File").deleteMany({
      ancestors: this._id,
    }),
    this.model("Problem").deleteMany({
      ancestors: this._id,
    }),
  ]);
  next();
});

// Make sure nickname is all lowercase
ProjectSchema.pre("save", function (next) {
  this.nickname = this.nickname.toLowerCase();
  next();
});

module.exports = mongoose.model("Project", ProjectSchema);
