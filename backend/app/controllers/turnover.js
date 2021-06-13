const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { Directory, Watch, Turnover } = require("../models/Directory");
const { File, Sequence } = require("../models/File");
const fs = require("fs");
const path = require("path");
const Problem = require("../models/Problem");

const {
  indexFilesystem,
  listDirectories,
  SequenceFs,
  FileFs,
  ErrorFs,
} = require("../utils/filesystem");

/*
// @desc      Get turnover directories
// @route     GET /api/v1/watch/:watchId/turnover
// @access    Private
exports.getTurnoverDirs = asyncHandler(async (req, res, next) => {
  const watch = await Watch.findById(req.params.watchId);

  if (!watch) {
    return next(
      new ErrorResponse(
        `No directory found with id: ${req.params.watchId}`,
        404
      )
    );
  }

  const turnoverDirs = await Turnover.find({ parent: watch._id });

  res.status(200).json({
    sucess: true,
    data: turnoverDirs,
  });
});
*/

// @desc    Get turnover directories
// @route   GET /api/v1/watch/:watchId/turnover
// @access  Private
exports.getTurnoverDirs = asyncHandler(async (req, res, next) => {
  const watch = await Watch.findById(req.params.watchId);
  const { _id, path, ancestors } = watch;

  if (!watch) {
    return next(
      new ErrorResponse(
        `Directory not found with id: ${req.params.watchId}`,
        404
      )
    );
  }

  // Get directories from filesystem
  let turnoverDirs;
  try {
    turnoverDirs = await listDirectories(path);
  } catch (err) {
    return res.status(200).json({
      success: false,
      data: {
        current: [],
        missing: [],
      },
    });
  }

  // Add new dirs to db
  const promises = [];
  const options = { new: true, upsert: true };

  for await (const dir of turnoverDirs) {
    const find = {
      parent: _id,
      path: dir,
    };

    const update = {
      parent: _id,
      path: dir,
      ancestors: [...ancestors, _id],
    };

    promises.push(
      Turnover.findOneAndUpdate(find, update, options).select(
        "-ancestors -parent -kind -__v -createdAt"
      )
    );
  }
  const turnover = await Promise.all(promises);

  // Find dirs from db that no longer exist
  const missing = await Turnover.find({
    parent: watch._id,
    path: { $nin: turnoverDirs },
  }).select("-ancestors -parent -kind -__v -createdAt");

  /*
  // Find current indexed dirs
  const current = await Turnover.find({
    parent: watch._id,
    path: { $in: turnoverDirs },
  }).select("-ancestors -parent -kind -__v -createdAt");

  // Find new dirs
  const existingPaths = [...current, ...missing].map(({ path }) => path);
  const newPaths = turnoverDirs.filter((dir) => !existingPaths.includes(dir));
  const newObjects = newPaths.map((elem) => ({
    path: elem,
    isIndexed: false,
    indexedAt: null,
    isIgnored: false,
  }));

  const new_ = Turnover.insertMany(
    newPaths.map((elem) => ({
      path: elem,
      parent: _id,
      ancestors: [...ancestors, _id],
    }))
  );
  */

  res.status(200).json({
    success: true,
    data: {
      current: turnover,
      missing: missing,
    },
  });
});

// @desc      Get turnover dir
// @route     GET /api/v1/turnover/:id
// @access    Private
exports.getTurnoverDir = asyncHandler(async (req, res, next) => {
  const turnover = await Turnover.findById(req.params.id).select(
    "-ancestors -parent -kind -__v -createdAt"
  );
  if (!turnover) {
    return next(
      new ErrorResponse(`No directory found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    sucess: true,
    data: turnover,
  });
});

// @desc      Update turnover dir
// @route     PUT /api/v1/turnover/:id
// @access    Private
exports.updateTurnoverDir = asyncHandler(async (req, res, next) => {
  let turnover = await Turnover.findById(req.params.id);

  if (!turnover) {
    return next(
      new ErrorResponse(`No directory found with id: ${req.params.id}`, 404)
    );
  }

  turnover = await Turnover.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select("-ancestors -parent -kind -__v -createdAt");

  res.status(200).json({
    success: true,
    data: turnover,
  });
});

// @desc      Get files and image sequences
// @route     PUT /api/v1/turnover/:id/index
// @access    Private
exports.indexTurnoverDir = asyncHandler(async (req, res, next) => {
  const turnover = await Turnover.findById(req.params.id).select(
    "-kind -__v -createdAt"
  );

  if (!turnover) {
    return next(
      new ErrorResponse(`No directory found with id: ${req.params.id}`, 404)
    );
  }

  const { _id } = turnover;

  // Check the directory hasn't already been indexed
  if (turnover.isIndexed) {
    await File.deleteMany({ parent: _id });
    turnover.isIndexed = false;
    turnover.indexedAt = null;
    await turnover.save();
  }

  const ancestors = {
    parent: _id,
    ancestors: [...turnover.ancestors, _id],
  };

  const promises = [];
  for await (file of indexFilesystem(turnover.path)) {
    switch (file.constructor) {
      case SequenceFs:
        promises.push(Sequence.create({ ...file.toObject(), ...ancestors }));
        break;

      case FileFs:
        promises.push(File.create({ ...file.toObject(), ...ancestors }));
        break;

      case ErrorFs:
        promises.push(Problem.create({ ...file.toObject(), ...ancestors }));
        break;

      default:
        break;
    }
  }
  await Promise.all(promises);

  turnover.isBusy = false;
  turnover.isIndexed = true;
  turnover.indexedAt = Date.now();
  await turnover.save();

  res.status(200).json({
    success: true,
    data: turnover,
  });
});

// @desc      Delete turnover dir
// @route     DELETE /api/v1/turnover/:id
// @access    Private
exports.deleteTurnoverDir = asyncHandler(async (req, res, next) => {
  const turnover = await Turnover.findById(req.params.id);
  const { _id } = turnover;

  if (!turnover) {
    return next(
      new ErrorResponse(`No directory found with id: ${req.params.id}`, 404)
    );
  }

  await File.deleteMany({ parent: _id });
  turnover.isIndexed = false;
  turnover.indexedAt = null;
  await turnover.save();

  res.status(200).json({
    success: true,
    data: turnover,
  });
});
