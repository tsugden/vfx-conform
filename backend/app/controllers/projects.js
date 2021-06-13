const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Project = require("../models/Project");

// @desc      Create a project
// @route     POST /api/v1/project
// @access    Private
exports.createProject = asyncHandler(async (req, res, next) => {
  const { _id, name, nickname } = await Project.create(req.body);

  res.status(200).json({
    success: true,
    project: { _id, name, nickname },
  });
});

// @desc      Get all projects
// @route     GET /api/v1/project
// @access    Public
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find()
    .select("-parent -ancestors -createdAt -__v")
    .sort({ name: 1 });

  res.status(200).json({
    success: true,
    projects,
  });
});

// @desc      Get single project
// @route     GET /api/v1/project/:nickname
// @access    Private
exports.getProject = asyncHandler(async (req, res, next) => {
  const nickname = req.params.nickname.toLowerCase();
  const project = await Project.findOne({ nickname }).select(
    "-parent -ancestors -createdAt -__v"
  );

  if (!project) {
    return next(
      new ErrorResponse(`No project found with nickname: ${nickname}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    project,
  });
});

// @desc      Update single project
// @route     PUT /api/v1/projectid/:id
// @access    Private
exports.updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`No project found with id: ${req.params.id}`, 404)
    );
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select("-parent -ancestors -createdAt -__v");

  res.status(200).json({
    success: true,
    project,
  });
});

// @desc      Delete single project
// @route     DELETE /api/v1/project/:nickname
// @access    Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`No project found with id: ${req.params.id}`, 404)
    );
  }
  project.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Get all children
// @route     POST /api/v1/project/:id/children
// @access    Private
// FOR AGGREGATE REF ONLY
exports.getChildren = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`No project found with id: ${req.params.id}`, 404)
    );
  }

  const cursor = await Project.aggregate().graphLookup({
    from: "directories",
    startWith: "$_id",
    connectFromField: "_id",
    connectToField: "projectId",
    as: "children",
  });

  res.status(200).json({
    success: true,
    data: cursor,
  });
});
