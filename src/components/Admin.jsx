
import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TaskTable from "./TaskTable";
import UserSelector from "./UserSelector";
import { toast } from 'react-toastify';

import "../styles/Admin.css";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
const backendUrl = import.meta.env.VITE_API_KEY;



export default function Admin({ users }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Fetch tasks, refetch when selectedUser changes
  const { data: tasks = [], isLoading: tasksLoading, error: tasksError, refetch } = useQuery({
    queryKey: ['tasks', selectedUser],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tasks`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    },
    enabled: !!selectedUser // Only fetch when a user is selected
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPassword("");
      toast.success("Login successful!");
    } 
    else if(String(password).length === 0) {
      toast.error("Please enter a password");
    }
    else {
      toast.error("Incorrect password");
      setPassword("");
    }
  };



  // Filter tasks by user, date range, and status
  const filteredTasks = tasks.filter(task => {
    if (!selectedUser || selectedUser === "") return false;
    if (task.userName !== selectedUser) return false;
    // Date range filter
    if (fromDate && toDate) {
      // Assume task.date is in 'YYYY-MM-DD' format
      if (task.date < fromDate || task.date > toDate) return false;
    } else if (fromDate) {
      if (task.date < fromDate) return false;
    } else if (toDate) {
      if (task.date > toDate) return false;
    }
    if (selectedStatus && task.status !== selectedStatus) return false;
    return true;
  });


  if (!authenticated) {
    return (
      <div className="admin-login-popup" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'rgba(0,0,0,0.05)',
      }}>
        <div style={{
          background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', minWidth: '300px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={{ padding: '0.5rem', borderRadius: '4px', background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (tasksLoading) {
    return <div className="admin-panel"><div>Loading data...</div></div>;
  }
  if (tasksError) {
    return <div className="admin-panel"><div>Error loading data.</div></div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2 className="admin-title">Employee's Task Details</h2>
        <button
          onClick={() => navigate("/")}
          className="admin-back-btn"
          title="Go Back"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-filter-item">
          <UserSelector
            users={users}
            selectedUser={selectedUser}
            onSelect={setSelectedUser}
          />
        </div>
        <div className="admin-filter-item">
          <label>From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            className="date-range-input"
          />
        </div>
        <div className="admin-filter-item">
          <label>To Date:</label>
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            className="date-range-input"
          />
        </div>
        <div className="status-filter admin-filter-item">
          <label className="status-label">Status:</label>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="status-select"
          >
            <option value="">-- All --</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>
      {selectedUser && selectedUser !== "" && filteredTasks.length > 0 ? (
        <TaskTable tasks={filteredTasks} />
      ) : (
        <div className="admin-no-tasks">
          {selectedUser && selectedUser !== "" ? "No tasks for selected user with selected filters." : "Please select a user to view tasks."}
        </div>
      )}
    </div>
  );
}
