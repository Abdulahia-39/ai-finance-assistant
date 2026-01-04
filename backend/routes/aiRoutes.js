import express from "express";
import { chatWithAI } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.use(protect);

// Define the POST endpoint for chat
aiRouter.post("/chat", chatWithAI);

export default aiRouter;
