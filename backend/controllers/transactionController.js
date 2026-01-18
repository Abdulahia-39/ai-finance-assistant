import Transaction from "../models/transactionModel.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 })
      .lean();
    return res.json(transactions);
  } catch (err) {
    console.error("getTransactions error", err);
    return res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

export const saveTransaction = async (req, res) => {
  const { amount, type, category, merchant, note } = req.body;

  console.log(amount, type, category);
  if (!amount || !type || !category) {
    return res.status(401).json({ message: "Please, fill in all the fields" });
  }

  const transaction = await Transaction.create({
    amount,
    type,
    category,
    userId: req.user.id,
    merchant: merchant ? merchant : null,
    note: note ? note : null,
  });

  if (transaction) {
    res.status(201).json(transaction);
  } else {
    res.status(401).json({ message: "Invalid transaction" });
  }
};

export const updateTransaction = async (req, res) => {};

export const deleteTransaction = async (req, res) => {};

export const getBalanace = async (req, res) => {
  const { userId } = req.body;
  const result = await Transaction.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
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
        balance: { $subtract: ["$totalIncome", "$totalExpense"] },
      },
    },
  ]);

  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(401).json({ message: "Balance could't be extracted" });
  }
};
