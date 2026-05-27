import { useEffect, useState } from "react";
import { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } from "../services/api";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api"

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const { role } = useAuth();

  const fetchAll = async () => {
    try { const res = await getAllEmployees(); setEmployees(res.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAdd = () => { setEditData(null); setShowForm(true); };
  const handleEdit = (emp) => { setEditData(emp); setShowForm(true); };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await deleteEmployee(id); fetchAll();
  };
  const handleSubmit = async (data) => {
    if (editData?.id) await updateEmployee(editData.id, data);
    else await addEmployee(data);
    setShowForm(false); fetchAll();
  };

  const filtered = employees.filter(e =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Employees</h1>
            <p className="subtitle">{employees.length} total records</p>
          </div>
          <div className="header-actions">
            <input className="search-input" placeholder="Search by name / dept..." value={search} onChange={e => setSearch(e.target.value)} />
            {role === "ADMIN" && <button className="btn-add" onClick={handleAdd}>+ Add Employee</button>}
          </div>
        </div>
        {loading ? <div className="loading">Loading...</div> : <EmployeeTable employees={filtered} onEdit={handleEdit} onDelete={handleDelete} />}
        {showForm && <EmployeeForm initial={editData} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />}
      </main>
    </div>
  );
}
