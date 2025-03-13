const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user.js");

usersRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password, "estas son las credenciales");

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
    });

    console.log(user);

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

module.exports = usersRouter;
