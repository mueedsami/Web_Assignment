import React, { useState } from "react";
import './taskform.css';
import { useNavigate } from "react-router-dom";

const Taskform= ()=>{

    const navigate = useNavigate();

    const [taskData, setTaskData] = useState({
        title:'',
        description:'',
        dueDate:'',
        priority:'Medium',
        completed: false


    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTaskData({
            ...taskData,
            [name]:value
        });
    }

    const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');

  console.log("Submitting task data:", taskData);
  console.log("Using token:", token);

  try {
    const response = await fetch('http://localhost:3000/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(taskData)
    });

    console.log("Raw response:", response);

    const result = await response.json();
    console.log("Response JSON:", result);

    if (!response.ok) {
      console.error("Server responded with an error:", result);
      alert(`Error: ${result.message || 'Unknown error'}`);
      return;
    }

    console.log("Task created successfully.");
    navigate('/dashboard');

  } catch (error) {
    console.error('Network or fetch error:', error);
    alert('Network error occurred while creating task.');
  } finally {
    setTaskData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium'
    });
  }
};


    return(
        <>
        <div className="task-form-container">
            <h2>Create Task</h2>
            <form className="taskform" onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value ={taskData.title} onChange={handleChange} placeholder="Enter title" required />

                <label>Description</label>
                <input type="text" name="description" value ={taskData.description} onChange={handleChange} placeholder="Enter description" required />

                <label>Due Date</label>
                <input type="date" name="dueDate" value ={taskData.dueDate} onChange={handleChange} placeholder="Enter due date" required />

                <label>Priority</label>
                <select name="priority" value ={taskData.priority} onChange={handleChange} placeholder="Enter priority" required >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <button type="submit">Create Task</button>
            </form>

        </div>
        </>
    )


};

export default Taskform;
