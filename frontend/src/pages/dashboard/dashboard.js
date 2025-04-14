import React, { useEffect, useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    let query = '';
    if (sortBy || filterBy) {
      query = `?${sortBy ? `sortBy=${sortBy}` : ''}${filterBy ? `&filterBy=${filterBy}` : ''}`;
    }

    try {
      const response = await fetch(`http://localhost:3000/task/list${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error.message);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [sortBy, filterBy]);

  return (
    <div className="dashboardContainer">
      <h2>Task Dashboard</h2>

      <div className="filterContainer">
        <label>Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="dueDate">Due Date</option>
        </select>

        <label>Filter by Priority: </label>
        <select onChange={(e) => setFilterBy(e.target.value)}>
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="taskList">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="taskCard">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Priority: {task.priority}</p>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
