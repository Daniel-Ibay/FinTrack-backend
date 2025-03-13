const goalsRouter = require("express").Router();
const Goal = require("../models/goal.js");
const User = require("../models/user.js");

goalsRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const goals = await Goal.find({ userId });

    res.status(200).json(goals);
  } catch {
    res.status(400).json({ error: error.message });
  }
});

goalsRouter.post("/", async (req, res) => {
  try {
    const { amount, reason, category, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newGoal = new Goal({
      amount,
      reason,
      category,
      userId,
    });

    const savedGoal = await newGoal.save();
    res.status(200).json(savedGoal);
  } catch {
    res.status(400).json({ error: error.message });
  }
});

goalsRouter.delete("/:goalId", async (req, res) => {
  try {
    const goalId = req.params.goalId;

    const goal = await Goal.findByIdAndDelete(goalId);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = goalsRouter;
