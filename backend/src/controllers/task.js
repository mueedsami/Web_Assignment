import Task from '../models/task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      userId: req.user.id,
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: savedTask,
    });

  } catch (error) {
    console.error("Create task error:", error.message);
    res.status(400).json({
      message: "Task creation failed",
      error: error.message,
    });
  }
};
