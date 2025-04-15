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

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Task deletion failed", error: err.message });
  }
};

export const markTaskComplete = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task marked as completed", task });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark task complete", error: err.message });
  }
};

export const editTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body; // Extract data from request body
  const taskId = req.params.id; // Extract task ID from URL parameter

  try {
    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, priority }, // New task data to update
      { new: true } // Ensure the updated task is returned
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Return the updated task
    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error editing task:', error.message);
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        dueDate,
        priority
      },
      { new: true } // return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};