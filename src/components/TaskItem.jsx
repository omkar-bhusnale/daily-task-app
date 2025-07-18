import React, { useState } from "react";
import '../styles/TaskItem.css';

export default function TaskItem({ task, onUpdate }) {
  const [status, setStatus] = useState(task.status);
  const [comments, setComments] = useState(task.comments);

  const handleUpdate = () => {
    onUpdate({ ...task, status, comments });
  };

  return (
    <div className="task-item">
      <div>
        <div className="task-item-main">{task.task}</div>
        <div className="task-item-date">Assigned: {task.date}</div>
      </div>
      <div className="task-item-controls">
        <select
          className="task-item-select"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          className="task-item-input"
          value={comments}
          onChange={e => setComments(e.target.value)}
          placeholder="Comments"
        />
        <button
          className="task-item-btn"
          onClick={handleUpdate}
        >Update</button>
      </div>
    </div>
  );
}
