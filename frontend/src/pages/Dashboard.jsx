import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAllEmployees } from "../services/api";
import { useAuth } from "../context/AuthContext"


const StatCard = ({ label, value, icon, color }) => (
  <div className={`stat-card stat-${color}`}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees()
      .then((res) => setEmployees(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalSalary = employees.reduce((sum, e) => sum + Number(e.salary || 0), 0);
  const admins = employees.filter((e) => e.role === "ADMIN").length;
  const depts = [...new Set(employees.map((e) => e.department))].length;

  // Group by department
  const deptMap = employees.reduce((acc, e) => {
    acc[e.department] = (acc[e.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="page-wrap">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-sub">Overview of your organization</p>
          </div>
          <button className="btn-primary" onClick={() => navigate("/employees")}>
            Manage Employees →
          </button>
        </div>

        {loading ? (
          <div className="loading-wrap"><div className="spinner"></div></div>
        ) : (
          <>
            <div className="stats-grid">
              <StatCard label="Total Employees" value={employees.length} icon="👥" color="blue" />
              <StatCard label="Departments" value={depts} icon="🏢" color="green" />
              <StatCard label="Admins" value={admins} icon="🔐" color="orange" />
              <StatCard label="Total Payroll" value={`₹${totalSalary.toLocaleString()}`} icon="💰" color="purple" />
            </div>

            <div className="dashboard-bottom">
              <div className="dept-card">
                <h3>Employees by Department</h3>
                <div className="dept-list">
                  {Object.entries(deptMap).map(([dept, count]) => (
                    <div key={dept} className="dept-row">
                      <span className="dept-name">{dept || "Unassigned"}</span>
                      <div className="dept-bar-wrap">
                        <div
                          className="dept-bar"
                          style={{ width: `${(count / employees.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="dept-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="recent-card">
                <h3>Recent Employees</h3>
                <div className="recent-list">
                  {employees.slice(-5).reverse().map((emp) => (
                    <div key={emp.id} className="recent-row">
                      <div className="avatar sm">{emp.name?.[0]?.toUpperCase()}</div>
                      <div>
                        <div className="recent-name">{emp.name}</div>
                        <div className="recent-dept">{emp.department}</div>
                      </div>
                      <span className={`role-pill ${emp.role?.toLowerCase()}`}>{emp.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
