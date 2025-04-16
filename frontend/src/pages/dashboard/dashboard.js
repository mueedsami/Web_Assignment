import React, { useEffect, useState } from 'react';
import './dashboard.css';

const Dashboard = () => {

  const [userRole, setUserRole] = useState('');
  const [allUsers, setAllUsers] = useState([]);


  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Used for editing
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: ''
  });

  // Fetch tasks from the backend
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
      console.log('Fetched data:', data);

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


  //fetch users from backend
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:3000/user/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUserRole(data.role);
      } catch (err) {
        console.error('Failed to fetch user info:', err.message);
      }
    };
  
    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:3000/user/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAllUsers(data.users || []);
      } catch (err) {
        console.error('Failed to fetch users:', err.message);
      }
    };
  
    if (userRole === 'admin') {
      fetchAllUsers();
    }
  }, [userRole]);

  

  

  // Handle editing of a task
  const handleEdit = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      setEditingTaskId(taskId);
      setTaskData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority
      });
    }
  };

  // Handle saving the edited task
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/task/update/${editingTaskId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setEditingTaskId(null);
        fetchTasks();
      } else {
        console.error('Failed to update task');
      }
    } catch (err) {
      console.error('Error updating task:', err.message);
    }
  };

  // Mark task as complete
  const handleComplete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/task/complete/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) fetchTasks();
    } catch (error) {
      console.error('Error marking task complete:', error.message);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/task/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };
  
  
  //delete user
  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (res.ok) {
        setAllUsers(prev => prev.filter(user => user._id !== userId));
      } else {
        console.error('Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err.message);
    }
  };
  

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

        <label>Search Tasks:</label>
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchInput"
        />


      </div>

      <div className="taskList">
        {tasks.length > 0 ? (
          tasks
          .filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((task) => (
            <div key={task._id} className="taskCard">
              <div className={`statusBadge ${task.completed ? 'completed' : 'incomplete'}`}>
                {task.completed ? 'Completed' : 'Incomplete'}
              </div>

             
              {editingTaskId === task._id ? (
                <div>
                  <input
                    type="text"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    placeholder="Task Title"
                  />
                  <textarea
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    placeholder="Task Description"
                  />
                  <input
                    type="date"
                    value={taskData.dueDate}
                    onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                  />
                  <select
                    value={taskData.priority}
                    onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p>Priority: {task.priority}</p>
                  <div className="task-actions">
                    <button onClick={() => handleEdit(task._id)}>Edit</button>
                    <button onClick={() => handleComplete(task._id)}>Complete</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}

        {userRole === 'admin' && (
          <div className="adminPanel">
            <h2>All Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(user => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.role !== 'admin' && (
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      </div>

      

    
  );
};

export default Dashboard;
