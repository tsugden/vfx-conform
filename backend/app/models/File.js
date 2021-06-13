const mongoose = require("mongoose");
const path = require("path");

const options = {
  discriminatorKey: "kind",
};

const FileSchema = new mongoose.Schema(
  {
    root: {
      type: String,
    },
    dir: {
      type: String,
    },
    basename: {
      type: String,
    },
    name: {
      type: String,
    },
    ext: {
      type: String,
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

const File = mongoose.model("File", FileSchema);

const SequenceSchema = mongoose.Schema(
  {
    frameIn: {
      type: String,
    },
    frameOut: {
      type: String,
    },
    frameMid: {
      type: String,
    },
    length: {
      type: Number,
    },
    padding: {
      type: Number,
    },
    namePre: {
      type: String,
    },
    namePost: {
      type: String,
    },
    resolution: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    broken: {
      type: Boolean,
      default: false,
    },
    blacklist: {
      type: Boolean,
      default: false,
    },
  },
  options
);
const Sequence = File.discriminator("Sequence", SequenceSchema);

module.exports = { File, Sequence };
