// Module imports
const express = require("express");
const projectRouter = express.Router();
const projectIdRouter = express.Router();
const watchRouter = require("./watch");
const sequencesRouter = require("./sequences");

// Controller imports
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects");

// Middleware imports
const { protect, authorize } = require("../middleware/auth");

// Re-route into other into other resource routers
projectRouter.use("/:projectId/watch", watchRouter);
projectRouter.use("/:projectId/sequences", sequencesRouter);

// Set routes
projectRouter.route("/").post(createProject).get(getProjects);

projectRouter.route("/:nickname").get(getProject);

projectIdRouter.route("/:id").put(updateProject).delete(deleteProject);

// Exports
module.exports = { projectRouter, projectIdRouter };
