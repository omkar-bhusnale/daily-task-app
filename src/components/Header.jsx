import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="header-navbar">
      <div className="header-navbar-content">
        <h1 className="header-title">Daily Task Appender</h1>
        <div className="header-settings-container">
          <button
            onClick={() => navigate('/admin')}
            className="header-settings-btn"
            title="Settings"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
