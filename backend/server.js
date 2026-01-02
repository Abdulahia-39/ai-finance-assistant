import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); //for debugging the ai

connectDB();

app.use("/api/auth", userRoutes);

app.use("/api/transaction/expenses", expenseRoutes);

app.use("/api/ai", aiRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
