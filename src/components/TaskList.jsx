import React from "react";
import TaskItem from "./TaskItem";
import '../styles/TaskList.css';

export default function TaskList({ tasks, onUpdateTask }) {
  if (!tasks.length) return <div className="task-list-empty">No tasks for today.</div>;
  return (
    <div>
      {tasks.map((task, idx) => (
        <TaskItem key={idx} task={task} onUpdate={onUpdateTask} />
      ))}
    </div>
  );
}
