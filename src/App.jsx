import React, { useEffect, useState } from 'react';

import './index.css';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import UserSelector from './components/UserSelector';
import TaskForm from './components/TaskForm';
import DatePicker from './components/DatePicker';
import Admin from './components/Admin';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function App({ adminMode = false }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const backendUrl = import.meta.env.VITE_API_KEY || 'http://localhost:5000';

  const users = [
    { Name: "Sachin" },
    { Name: "Omkar" },
    { Name: "Gauri" },
    { Name: "Mahesh" },
    { Name: "Dinesh" },
    { Name: "Neeraj" },
    { Name: "Pragati" },
  ]
  
  // Fetch tasks
  const { data: tasks = [], isLoading: tasksLoading, error: tasksError } = useQuery({
    queryKey: ['tasks', selectedUser],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tasks`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    },
    enabled: !!selectedUser
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      const res = await fetch(`${backendUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      if (!res.ok) throw new Error('Failed to add task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    }
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      const res = await fetch(`${backendUrl}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });
      if (!res.ok) throw new Error('Failed to update task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    }
  });

  // Add task handler
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
    addTaskMutation.mutate(newTask);
  };

  // Update task handler
  const handleUpdateTask = (updatedTask) => {
    updateTaskMutation.mutate(updatedTask);
  };

  if (tasksLoading) {
    return <div className="app-container"><Header /><main className="main-content"><div>Loading...</div></main><Footer /></div>;
  }
  if (tasksError) {
    return <div className="app-container"><Header /><main className="main-content"><div>Error loading data.</div></main><Footer /></div>;
  }

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
