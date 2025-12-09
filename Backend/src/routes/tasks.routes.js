import { Router } from "express";
import * as TaskController from "../controllers/tasks.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, TaskController.getAll);
router.post("/", authMiddleware, TaskController.create);
router.put("/:id", authMiddleware, TaskController.update);
router.delete("/:id", authMiddleware, TaskController.remove);

export default router;
