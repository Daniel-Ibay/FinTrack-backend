const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const usersRouter = require("./controllers/users");
const transactionsRouter = require("./controllers/transactions");
const goalsRouter = require("./controllers/goals");
const loginRouter = require("./controllers/login");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

//routes

app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/goals", goalsRouter);
app.use("/api/login", loginRouter);

//export

module.exports = app;
