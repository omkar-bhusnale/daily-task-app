import React, { useEffect, useState } from 'react';

import './index.css';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import UserSelector from './components/UserSelector';
import TaskForm from './components/TaskForm';
import DatePicker from './components/DatePicker';
import Admin from './components/Admin';


function App({ adminMode = false }) {
  const [users, setUsers] = useState([
    { Name: "Sachin" },
    { Name: "Omkar" },
    { Name: "Gauri" },
    { Name: "Mahesh" },
    { Name: "Dinesh" },
    { Name: "Neeraj" },
    { Name: "Pragati" },
  ]);

  const backendUrl = import.meta.env.VITE_API_KEY || 'http://localhost:5000';

  const [selectedUser, setSelectedUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  // Temporary JSON database for tasks
  // All tasks are stored in the tasks state

  // Fetch tasks from backend API
  useEffect(() => {
    fetch(`${backendUrl}/tasks`)
      .then(res => res.json())
      .then(setTasks);
  }, [selectedUser]);

  // Add task
  const handleAddTask = ({ task, projectName, status, comments }) => {
    if (!selectedUser) return;
    const newTask = {
      userName: selectedUser,
      projectName,
      task,
      status,
      comments,
      date: selectedDate
    };
    fetch(`${backendUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(addedTask => setTasks(prev => [addedTask, ...prev]));
  };

  // Update task
  const handleUpdateTask = (updatedTask) => {
    fetch(`${backendUrl}/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
      .then(res => res.json())
      .then(savedTask => setTasks(tasks => tasks.map(t => t.id === savedTask.id ? savedTask : t)));
  };

  if (adminMode) {
    return <Admin tasks={tasks} users={users.map(u => u.Name)} />;
  }
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className={`cards-container${selectedUser ? ' cards-row' : ''}`}> 
          <div className="card">
            <UserSelector
              users={users.map(u => u.Name)}
              selectedUser={selectedUser}
              onSelect={setSelectedUser}
            />
            <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
          </div>
          {selectedUser && (
            <div className="card">
              <TaskForm onAddTask={handleAddTask} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
