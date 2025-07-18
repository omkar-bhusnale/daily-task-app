import React from "react";
import '../styles/UserSelector.css';

export default function UserSelector({ users, selectedUser, onSelect }) {
  return (
    <div className="user-selector">
      <label className="user-label">Select User:</label>
      <select
        className="user-select"
        value={selectedUser}
        onChange={e => onSelect(e.target.value)}
      >
        <option value="">-- Select --</option>
        {users.map(user => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>
    </div>
  );
}
