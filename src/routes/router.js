import express from "express";
import TaskController from "../controllers/TaskController.js";
import UserController from "../controllers/UserController.js";
import verifySecretKey from "../middleware/verifySecretKey.js";

const router = express.Router();

// root
router.get("/", (req, res) => {
  res.send(`
    <div style="color: #0CCCA2; font-family: arial; height: 100vh; display: flex; justify-content: center; align-items: center;">
      <h3>Welcome to Task Manager API by @arsyHub 😊</h3>
    </div>
  `);
});

router.use(verifySecretKey);

// user
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// task
router.get("/tasks", TaskController.getAllTasks);
router.get("/tasks/:id", TaskController.getTaskById);
router.post("/tasks", TaskController.createTask);
router.put("/tasks/:id", TaskController.updateTask);
router.delete("/tasks/:id", TaskController.deleteTask);

export default router;
