const express = require("express");
const { checkProjectId } = require("./projects-middleware");
const Projects = require("./projects-model");

const router = express.Router();

// [ ] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.

//// NOTE DONE YET ////
router.get("/api/projects", (req, res, next) => {
  Projects.get().then().catch(next);
});

// [ ] `[GET] /api/projects/:id`
//   - Returns a project with the given `id` as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.

router.get("/api/projects/:id", checkProjectId, (req, res, next) => {
  Projects.get(req.params.id).then().catch(next);
});

// [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.post("api/projects", (req, res, next) => {
  Projects.insert(req.body).then().catch(next);
});

// [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.put("/api/projects/:id", checkProjectId, (req, res, next) => {
  Projects.update(req.params.id, req.body).then().catch(next);
});

// [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.

router.delete("/api/projects/:id", checkProjectId, (req, res, next) => {
  Projects.remove(req.params.id).then().catch(next);
});

// [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.// Write your "projects" router here!
router.get("/api/projects/:id/actions", checkProjectId, (req, res, next) => {
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
