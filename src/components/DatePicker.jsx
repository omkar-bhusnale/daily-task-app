import React from "react";
import '../styles/DatePicker.css';

export default function DatePicker({ selectedDate, onChange }) {
  return (
    <div className="date-picker">
      <label className="date-label">Select Date:</label>
      <input
        type="date"
        className="date-input"
        value={selectedDate}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
