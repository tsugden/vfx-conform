const mongoose = require("mongoose");
const path = require("path");

const options = {
  discriminatorKey: "kind",
};

const DirectorySchema = new mongoose.Schema(
  {
    path: {
      type: String,
      unique: true,
      required: [true, "Please add a path"],
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
  },
  options
);

// Cascade delete child dirs when a dir is deleted
// Middleware acts on model only
DirectorySchema.pre("remove", async function (next) {
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

const Directory = mongoose.model("Directory", DirectorySchema);

const WatchSchema = mongoose.Schema({}, options);

const Watch = Directory.discriminator("Watch", WatchSchema);

const TurnoverSchema = mongoose.Schema(
  {
    isIndexed: {
      type: Boolean,
      default: false,
    },
    indexedAt: {
      type: Date,
      default: null,
    },
  },
  options
);
const Turnover = Directory.discriminator("Turnover", TurnoverSchema);

module.exports = { Directory, Watch, Turnover };
