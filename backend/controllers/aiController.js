import Groq from "groq-sdk";
import "dotenv/config";
import mongoose from "mongoose";
import Transaction from "../models/transactionModel.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message, history } = req.body;
    const userId = req?.user?.id || req?.user?._id;

    const safeHistory = Array.isArray(history) ? history : [];

    // Build concise user financial context from DB
    let contextText = "";
    try {
      if (userId) {
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Balance summary
        const balanceAgg = await Transaction.aggregate([
          { $match: { userId: userObjectId } },
          {
            $group: {
              _id: null,
              totalIncome: {
                $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
              },
              totalExpense: {
                $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
              },
            },
          },
          {
            $project: {
              _id: 0,
              balance: { $subtract: ["$totalIncome", "$totalExpense"] },
              totalIncome: 1,
              totalExpense: 1,
            },
          },
        ]);

        const expenseByCategory = await Transaction.aggregate([
          { $match: { userId: userObjectId, type: "expense" } },
          { $group: { _id: "$category", total: { $sum: "$amount" } } },
          { $sort: { total: -1 } },
          { $limit: 5 },
        ]);

        const incomeByCategory = await Transaction.aggregate([
          { $match: { userId: userObjectId, type: "income" } },
          { $group: { _id: "$category", total: { $sum: "$amount" } } },
          { $sort: { total: -1 } },
          { $limit: 5 },
        ]);

        const recentTransactions = await Transaction.find({ userId })
          .sort({ date: -1 })
          .limit(5)
          .lean();

        const balance = balanceAgg?.[0] || {
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
        };
        const expenseCats = expenseByCategory.map(
          (c) => `${c._id}: ${c.total.toFixed(2)}`
        );
        const incomeCats = incomeByCategory.map(
          (c) => `${c._id}: ${c.total.toFixed(2)}`
        );
        const recentLines = recentTransactions.map((t) => {
          const dt = t.date ? new Date(t.date).toISOString().slice(0, 10) : "";
          return `${dt} • ${t.type} • ${t.category} • ${t.amount.toFixed(2)}${
            t.merchant ? ` @ ${t.merchant}` : ""
          }${t.note ? ` — ${t.note}` : ""}`;
        });

        contextText = [
          `Totals — income: ${balance.totalIncome.toFixed(
            2
          )}, expense: ${balance.totalExpense.toFixed(
            2
          )}, balance: ${balance.balance.toFixed(2)}`,
          expenseCats.length
            ? `Top expense categories: ${expenseCats.join(", ")}`
            : "Top expense categories: none",
          incomeCats.length
            ? `Top income categories: ${incomeCats.join(", ")}`
            : "Top income categories: none",
          recentLines.length
            ? `Recent transactions:\n- ${recentLines.join("\n- ")}`
            : "Recent transactions: none",
        ].join("\n");
      }
    } catch (ctxErr) {
      // If context fails, proceed without blocking the AI response
      contextText = "";
    }

    const messages = [
      {
        role: "system",
        content: [
          "You are an expert financial assistant. Keep answers concise and helpful.",
          contextText ? `\nUser financial context:\n${contextText}\n` : "",
        ].join(""),
      },
      ...safeHistory.map((item) => ({
        role: item.role === "user" ? "user" : "assistant",
        content: item.text,
      })),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    // console.log(reply);

    res.status(200).json({
      success: true,
      text: reply,
    });
  } catch (error) {
    console.error("❌ Groq Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Groq AI error",
    });
  }
};
