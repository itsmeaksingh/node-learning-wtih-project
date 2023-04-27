const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// router.get("/", getAllTasks);
// router.post("/", createTask);
// router.get("/:id", getTask);
// router.patch("/:id", updateTask);
// router.delete("/:id", deleteTask);

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;

// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.get('/api/v1/tasks/:id')    - get single task
// app.petch('/api/v1/tasks/:id')  - update task
// app.delete('/api/v1/tasks/:id') - delete task
