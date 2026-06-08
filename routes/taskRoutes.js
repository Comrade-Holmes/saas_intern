const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({
    userId: req.user.id,
  });

  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ message: "Title is required" });
  }

  const task = new Task({
    title,
    description,
    userId: req.user.id,
  });

  await task.save();

  res.status(201).json(task);
});

router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) {
    return res
      .status(404)
      .json({ message: "Task not found" });
  }

  await task.deleteOne();

  res.json({
    message: "Task deleted",
  });
});

module.exports = router;
