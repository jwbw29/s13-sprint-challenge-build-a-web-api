const express = require("express");
const actionsRouter = require("./actions-model");

const router = express.Router();

// [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.

//// NOTE DONE YET /////
router.get("/api/actions", (req, res) => {
  actionsRouter
    .get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the actions",
        errMessage: err.message,
        stack: err.stack,
      });
    });
});

// [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.

// [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.

// [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

// [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.

module.exports = router;
