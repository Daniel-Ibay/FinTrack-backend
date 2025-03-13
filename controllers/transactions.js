const express = require("express");
const User = require("../models/user");
const Transaction = require("../models/transaction");
const transactionsRouter = express.Router();

transactionsRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const transactions = await Transaction.find({ userId });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

transactionsRouter.post("/", async (req, res) => {
  try {
    const { amount, type, category, userId, date } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newTransaction = new Transaction({
      amount,
      type,
      category,
      userId,
      date,
    });
    console.log(newTransaction);

    const savedTransaction = await newTransaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

transactionsRouter.get("/:userId/balance", async (req, res) => {
  try {
    const userId = req.params.userId;

    const transactions = await Transaction.find({ userId });

    let balance = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        balance += transaction.amount;
      } else if (transaction.type === "expense") {
        balance -= transaction.amount;
      }
    });

    res.status(200).json({ balance });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = transactionsRouter;
