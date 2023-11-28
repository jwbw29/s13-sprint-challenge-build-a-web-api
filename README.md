# Sprint Challenge Instructions

## Tools

- Node >= 16.x
- NPM >= 8.x (update NPM executing `npm i -g npm`)
- Unix-like shell (Gitbash/bash/zsh)

## Project Set Up

- Fork, clone, and `npm install`.
- Initialize the database of the project executing `npm run resetdb`.
- Run tests locally executing `npm test`.

## Project Instructions

### Introduction

You will build an API that has Create, Read, Update and Delete (CRUD) functionality for two resources called `projects` and `actions`.

### Task 1: Build NPM Scripts

A _"test"_ script already exists you can use to run tests against your code.
A _"resetdb"_ script exists that allows you to reset the database to its original state.

- [x] Write an _npm script_ named _"start"_ that uses `node` to run the API server.
- [x] Write an _npm script_ named _"server"_ that uses `nodemon` to run the API server.
- [x] Install _nodemon_ as a development dependency that would not be used in production.

### Task 2: Consume Environment Variables

- [x] Bring the port number from the `process.env` variable, falling back to `9000` if `process.env.PORT` is undefined **!!!**

### Task 3: Build Endpoints

Inside `api/projects/projects-router.js` build the following endpoints:

- [x] `[GET] /api/projects`
  - Returns an array of projects as the body of the response.
  - If there are no projects it responds with an empty array.
- [x] `[GET] /api/projects/:id`
  - Returns a project with the given `id` as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
- [x] `[POST] /api/projects`
  - Returns the newly created project as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [x] `[PUT] /api/projects/:id`
  - Returns the updated project as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [x] `[DELETE] /api/projects/:id`
  - Returns no response body.
  - If there is no project with the given `id` it responds with a status code 404.
- [x] `[GET] /api/projects/:id/actions`
  - Returns an array of actions (could be empty) belonging to a project with the given `id`.
  - If there is no project with the given `id` it responds with a status code 404.

Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:

- [ ] `[GET] /api/actions`
  - Returns an array of actions (or an empty array) as the body of the response.
- [ ] `[GET] /api/actions/:id`
  - Returns an action with the given `id` as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
- [ ] `[POST] /api/actions`
  - Returns the newly created action as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
  - When adding an action make sure the `project_id` provided belongs to an existing `project`.
- [ ] `[PUT] /api/actions/:id`
  - Returns the updated action as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[DELETE] /api/actions/:id`
  - Returns no response body.
  - If there is no action with the given `id` it responds with a status code 404.

### Task 4: Build Middleware functions

- [x] Write at least two middleware functions for this API, and consume them in the proper places of your code.

### Information on Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/database.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                |
| ----------- | --------- | ----------------------------------------------------------------------- |
| id          | number    | do not provide it when creating projects, the database will generate it |
| name        | string    | required                                                                |
| description | string    | required                                                                |
| completed   | boolean   | not required, defaults to false when creating projects                  |

#### Actions

| Field       | Data Type | Metadata                                                                                        |
| ----------- | --------- | ----------------------------------------------------------------------------------------------- |
| id          | number    | do not provide it when creating actions, the database will generate it                          |
| project_id  | number    | required, must be the id of an existing project                                                 |
| description | string    | required, up to 128 characters long                                                             |
| notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action |
| completed   | boolean   | not required, defaults to false when creating actions                                           |

### Information on Database Persistence Helpers

The project includes models you can use to manage the persistence of _project_ and _action_ data. These files are `api/projects/projects-model.js` and `api/actions/actions-model.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projects-model.js` includes an extra method called `getProjectActions()` that takes a _project id_ as its only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

**Important Notes:**

- Do not make changes to your `package.json` except to add **additional** dependencies and scripts. Do not update existing packages.
- Use an HTTP client like `HTTPie`, `Postman` or `Insomnia` to manually test the API's endpoints.
- Use Express Routers to organize your endpoints.
- Even though you are only required to write two middleware functions, it is advised that you leverage middlewares as much as possible.
- You are welcome to create additional files, but **do not move or rename existing files** or folders.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work.

# TESTS

✓ [0] sanity check (6 ms)
server.js
projects endpoints
[GET] /api/projects
✓ [1] sends back all projects that exist (15 ms)
✓ [2] sends back empty array if no projects (6 ms)
[GET] /api/projects/:id
✓ [3] sends back the project with given id (5 ms)
✓ [4] responds with a 404 if no project with given id (5 ms)
[POST] /api/projects
✓ [5] responds with the newly created project (12 ms)
✓ [6] inserts a new project into projects table (7 ms)
✓ [7] responds with a 400 if the request body is missing name or description (7 ms)
[PUT] /api/projects/:id
✓ [8] responds with the updated project (8 ms)
✓ [9] updates the project in the projects table (8 ms)
✓ [10] responds with a 400 if the request body is missing name, description or completed (8 ms)
[DELETE] /api/projects/:id
✓ [11] deletes the action with the given id (7 ms)
✓ [12] responds with a 404 if no project with given id (4 ms)
[GET] /api/projects/:id/actions
✓ [13] sends back the actions in project with given id (6 ms)
✓ [14] sends back empty array if no actions in project with given id (11 ms)
actions endpoints
[GET] /api/actions
✓ [15] sends back all actions that exist (6 ms)
✓ [16] sends back empty array if no actions (6 ms)
[GET] /api/actions/:id
✓ [17] sends back the action with given id (5 ms)
✓ [18] responds with a 404 if no action with given id (5 ms)
[POST] /api/actions
✓ [19] responds with the newly created action (7 ms)
✓ [20] inserts a new action into actions table (5 ms)
✓ [21] responds with a 400 if the request body is missing notes, description or project_id (6 ms)
[PUT] /api/actions/:id
✕ [22] responds with the updated action (8 ms)
✕ [23] updates the action in the actions table (6 ms)
✕ [24] responds with a 400 if the request body is missing missing notes, description, completed or project_id (5 ms)
[DELETE] /api/actions/:id
✕ [25] deletes the action with the given id (7 ms)
✓ [26] responds with a 404 if no action with given id (5 ms)
