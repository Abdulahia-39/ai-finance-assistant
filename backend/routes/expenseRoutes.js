import { Router } from "express";
import { getExpenses } from "../controllers/expensesController.js";
import { protect } from "../middleware/authMiddleware.js";

const expenseRoutes = Router();

expenseRoutes.use(protect);

expenseRoutes.get("/", getExpenses);

export default expenseRoutes;
