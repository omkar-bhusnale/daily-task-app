import React, { useState } from "react";
import '../styles/TaskForm.css';

export default function TaskForm({ onAddTask }) {
  const [task, setTask] = useState("");
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!task || !status) return;
    onAddTask({ task, projectName, status, comments });
    setTask("");
    setProjectName("");
    setStatus("");
    setComments("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label className="form-label">Project Name:</label>
        <input
          className="form-input"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Task Name:</label>
        <input
          className="form-input"
          value={task}
          onChange={e => setTask(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Status:</label>
        <select
          className="form-select"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        >
          <option value="">-- Select Status --</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Comments:</label>
        <input
          className="form-input"
          value={comments}
          onChange={e => setComments(e.target.value)}
        />
      </div>
      <button type="submit" style={{background:'#2563eb',color:'#fff',padding:'0.5rem 1rem',borderRadius:'0.5rem',border:'none',cursor:'pointer'}}>Add Task</button>
    </form>
  );
}
