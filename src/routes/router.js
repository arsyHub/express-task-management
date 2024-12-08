import express from "express";
import TaskController from "../controllers/TaskController.js";
import UserController from "../controllers/UserController.js";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema.js";
import validateRequest from "../middleware/validateRequest.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchema.js";
import ProjectController from "../controllers/ProjectController.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/projectSchema.js";
// import verifySecretKey from "../middleware/verifySecretKey.js";

const router = express.Router();

// root
router.get("/", (req, res) => {
  res.send(`
    <div style="color: #0CCCA2; font-family: arial; height: 100vh; display: flex; justify-content: center; align-items: center;">
      <h3>Welcome to Task Manager API by @arsyHub 😊</h3>
    </div>
  `);
});

// router.use(verifySecretKey);

// user
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.post(
  "/users",
  validateRequest(createUserSchema),
  UserController.createUser
);
router.put(
  "/users/:id",
  validateRequest(updateUserSchema),
  UserController.updateUser
);
router.delete("/users/:id", UserController.deleteUser);

// project
router.get("/projects", ProjectController.getAllProjects);
router.get("/projects/:id", ProjectController.getProjectById);
router.post(
  "/projects",
  validateRequest(createProjectSchema),
  ProjectController.createProject
);
router.put(
  "/projects/:id",
  validateRequest(updateProjectSchema),
  ProjectController.updateProject
);
router.delete("/projects/:id", ProjectController.deleteProject);

// task
router.get("/tasks", TaskController.getAllTasks);
router.get("/tasks/:id", TaskController.getTaskById);
router.post(
  "/tasks",
  validateRequest(createTaskSchema),
  TaskController.createTask
);
router.put(
  "/tasks/:id",
  validateRequest(updateTaskSchema),
  TaskController.updateTask
);
router.delete("/tasks/:id", TaskController.deleteTask);

export default router;
