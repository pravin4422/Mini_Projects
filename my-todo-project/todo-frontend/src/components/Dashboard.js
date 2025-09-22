import React, { useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../App";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import "../styles/Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { logout } = useAuth();

  // Fetch tasks only if token exists
  const fetchTasks = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      logout();
      return;
    }
    try {
      const res = await api.get("/tasks"); // token sent via interceptor
      setTasks(res.data);
    } catch (err) {
      // Check if it's a 401 (unauthorized) error
      if (err.response && err.response.status === 401) {
        // Session expired, logout silently without showing alert
        logout();
      } else {
        // Other errors, show alert
        alert("Failed to fetch tasks. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fixed: This function should match what AddTodo expects (onAdd)
  const addTask = async (title) => {
    try {
      const res = await api.post("/tasks", { title });
      setTasks([...tasks, res.data]);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        logout();
      } else {
        alert("Failed to add task. Please try again.");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        logout();
      } else {
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  // If you want to add toggle functionality for your TodoItem component
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>My Tasks</h2>
        <button onClick={logout}>Logout</button>
      </div>
      
      {/* Fixed: Pass addTask as onAdd prop */}
      <AddTodo onAdd={addTask} />
      
      <ul>
        {tasks.map(task => (
          <TodoItem 
            key={task.id} 
            todo={task}           // Changed from 'task' to 'todo' to match TodoItem props
            onToggle={toggleTask} // Added toggle functionality
            onDelete={deleteTask} // Changed prop name to match TodoItem
          />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;