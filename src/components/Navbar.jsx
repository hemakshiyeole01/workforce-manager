import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { username, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">⚡</span>
        <span className="brand-text">EmpSystem</span>
      </div>
      <div className="nav-links">
        {role === "ADMIN" && <Link to="/dashboard">Dashboard</Link>}
        <Link to="/employees">Employees</Link>
      </div>
      <div className="nav-user">
        <span className="role-badge" data-role={role}>{role}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
