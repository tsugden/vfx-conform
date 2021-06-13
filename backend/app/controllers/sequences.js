const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { Sequence } = require("../models/File");
const Project = require("../models/Project");

// @desc      Get all projects
// @route     GET /api/v1/projects/:projectId/sequences
// @access    Public
exports.getSequences = asyncHandler(async (req, res, next) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id: ${projectId}`, 404)
    );
  }

  const nameRegex = new RegExp(req.query.name, "i");

  const sequences = await Sequence.find({
    basename: { $regex: nameRegex },
    broken: false,
    ancestors: projectId,
  })
    .select("-parent -ancestors -createdAt -__v")
    .sort({ basename: 1 });

  res.status(200).json({
    success: true,
    count: sequences.length,
    sequences,
  });
});
