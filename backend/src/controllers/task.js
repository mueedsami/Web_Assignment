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

export const getTasks = async (req, res) => {
  try {
    const { sortBy, filterBy } = req.query;
    const query = { userId: req.user.id };

    if (filterBy) {
      query.priority = filterBy;
    }

    let tasks = await Task.find(query);

    if (sortBy === 'dueDate') {
      tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

