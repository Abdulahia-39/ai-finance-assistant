import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", userRoutes);

app.use("/api/transaction/expenses", expenseRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
