import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createGoal,
  getGoals,
  addToGoal,
  deleteGoal,
} from "../controllers/goalsController.js";

const goalRoutes = Router();

goalRoutes.use(protect);

goalRoutes.post("/", createGoal);
goalRoutes.get("/", getGoals);
goalRoutes.put("/:id/add", addToGoal);
goalRoutes.delete("/:id", deleteGoal);

export default goalRoutes;
