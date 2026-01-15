import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["expense", "income"], required: true },
  category: { type: String, required: true }, // e.g., "Food"
  merchant: { type: String }, // e.g., "Starbucks"
  date: { type: Date, default: Date.now },
  note: { type: String },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
