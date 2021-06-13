const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { File, Sequence } = require("../models/File");

// @desc      Get all files
// @route     GET /api/v1/files
// @access    Private
exports.getFiles = asyncHandler(async (req, res, next) => {
  const files = await File.find().sort({ name: 1 });

  res.status(200).json({
    success: true,
    data: files,
  });
});

// @desc      Get single files
// @route     GET /api/v1/files/:id
// @access    Private
exports.getFile = asyncHandler(async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    return next(
      new ErrorResponse(`No file found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: file,
  });
});

// @desc      Delete all files
// @route     DELETE /api/v1/files
// @access    Private
exports.deleteFiles = asyncHandler(async (req, res, next) => {
  await File.deleteMany({});

  res.status(200).json({
    success: true,
    data: {},
  });
});
