import Goal from "../models/goalsModel.js";

// POST /api/goals - Create a new goal
export const createGoal = async (req, res) => {
  try {
    const { title, targetAmount, category, deadline } = req.body;
    if (!title || targetAmount === undefined) {
      return res
        .status(400)
        .json({ message: "Title and targetAmount are required" });
    }

    const goal = await Goal.create({
      userId: req.user.id,
      title,
      targetAmount: Number(targetAmount),
      category: category || "General",
      deadline: deadline || null,
      currentAmount: 0,
      status: "active",
    });

    return res.status(201).json(goal);
  } catch (err) {
    console.error("createGoal error", err);
    return res.status(500).json({ message: "Failed to create goal" });
  }
};

// GET /api/goals - Fetch all goals for the user
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    return res.json(goals);
  } catch (err) {
    console.error("getGoals error", err);
    return res.status(500).json({ message: "Failed to fetch goals" });
  }
};

// PATCH /api/goals/:id/add - Add money to a specific goal
export const addToGoal = async (req, res) => {
  try {
    const { amount } = req.body;
    const increment = Number(amount);
    if (!increment || Number.isNaN(increment) || increment <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    goal.currentAmount += increment;
    if (goal.currentAmount >= goal.targetAmount) {
      goal.currentAmount = goal.targetAmount;
      goal.status = "completed";
    }

    await goal.save();
    return res.json(goal);
  } catch (err) {
    console.error("addToGoal error", err);
    return res.status(500).json({ message: "Failed to update goal" });
  }
};

// DELETE /api/goals/:id - Cancel a goal
export const deleteGoal = async (req, res) => {
  try {
    const deleted = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Goal not found" });
    }

    return res.status(204).send();
  } catch (err) {
    console.error("deleteGoal error", err);
    return res.status(500).json({ message: "Failed to delete goal" });
  }
};
