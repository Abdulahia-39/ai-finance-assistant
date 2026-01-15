import { Router } from "express";
import {
  getBalanace,
  getTransactions,
  saveTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const transactionRoutes = Router();

transactionRoutes.use(protect);

transactionRoutes.get("/", getTransactions);

transactionRoutes.get("/balance", getBalanace);

transactionRoutes.post("/", saveTransaction);

export default transactionRoutes;
