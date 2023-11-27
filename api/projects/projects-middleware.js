// add middlewares here related to projects
const Projects = require("./projects-model");

const checkProjectId = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkProjectId };
