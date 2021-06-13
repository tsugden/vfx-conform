const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { Directory, Watch } = require("../models/Directory");
const Project = require("../models/Project");
const fs = require("fs");

// @desc      Create new folder
// @route     POST /api/v1/projects/:projectId/watch
// @access    Private
exports.createWatchDirectory = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return next(
      new ErrorResponse(
        `No project found with id: ${req.params.projectId}`,
        404
      )
    );
  }

  req.body.parent = req.params.projectId;
  req.body.ancestors = [...project.ancestors, req.params.projectId];

  const { _id, path } = await Watch.create(req.body);

  res.status(201).json({
    sucess: true,
    data: { _id, path },
  });
});

// @desc    Get all watch directories
// @route   GET /api/v1/projects/:projectId/watch
// @access  Private
exports.getWatchDirectories = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return next(
      new ErrorResponse(
        `Project not found with id: ${req.params.projectId}`,
        404
      )
    );
  }

  const watchDirs = await Watch.find({ parent: project._id }).select(
    "-ancestors -parent -kind -createdAt -__v"
  );
  res.status(200).json({
    success: true,
    directories: watchDirs,
  });
});

// @desc    Get single watch directory
// @route   GET /api/v1/watch/:id
// @access  Private
exports.getWatchDirectory = asyncHandler(async (req, res, next) => {
  const watch = await Watch.findById(req.params.id).select(
    "-ancestors -parent -kind -createdAt -__v"
  );

  if (!watch) {
    return next(
      new ErrorResponse(`No directory found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: watch,
  });
});

// @desc    Update watch directory
// @route   PUT /api/v1/watch/:id
// @access  Private
exports.updateWatchDirectory = asyncHandler(async (req, res, next) => {
  let watch = await Watch.findById(req.params.id);

  if (!watch) {
    return next(
      new ErrorResponse(`No directory found with id: ${req.params.id}`, 404)
    );
  }

  watch = await Watch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select("-parent -ancestors -createdAt -__v");

  res.status(200).json({
    success: true,
    data: watch,
  });
});

// @desc    Delete watch directory
// @route   DELETE /api/v1/watch/:id
// @access  Private
exports.deleteWatchDirectory = asyncHandler(async (req, res, next) => {
  let watch = await Watch.findById(req.params.id);

  if (!watch) {
    return next(
      new ErrorResponse(`No dir found with id: ${req.params.id}`, 404)
    );
  }

  watch = watch.remove();

  res.status(200).json({
    success: true,
    data: watch,
  });
});
