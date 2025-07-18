import React from "react";
import '../styles/TaskTable.css';

export default function TaskTable({ tasks }) {
  return (
    <div className="task-table-container">
      <h2 className="task-table-title">Task List</h2>
      {tasks.length === 0 && <div className="task-table-empty">No tasks available.</div>}
      <table className="task-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Project Name</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={task._id || task.id || idx}>
              <td>{task.userName}</td>
              <td>{task.date}</td>
              <td>{task.projectName}</td>
              <td>{task.task}</td>
              <td>{task.status}</td>
              <td>{task.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
