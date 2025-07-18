import React from "react";
import '../styles/TaskFilter.css';

export default function TaskFilter({ status, onChange }) {
  return (
    <div className="task-filter">
      <label className="task-label">Filter by Status:</label>
      <select
        className="task-select"
        value={status}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
