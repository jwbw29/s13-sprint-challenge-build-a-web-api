const express = require("express");
const { checkProjectId, checkNewProject } = require("./projects-middleware");
const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", checkProjectId, (req, res, next) => {
  res.json(req.project);
});

router.post("/", checkNewProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

// [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.put("/:id", checkProjectId, checkNewProject, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch(next);
});

// [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.

router.delete("/:id", checkProjectId, (req, res, next) => {
  Projects.remove(req.params.id);
});

// [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.// Write your "projects" router here!
router.get("/:id/actions", checkProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "Something bad happened in the projects router",
    errMessage: err.message,
    stack: err.stack,
  });
});

module.exports = router;
