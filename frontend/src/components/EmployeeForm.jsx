import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"

export default function EmployeeForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", email: "", department: "", salary: "", ...initial });

  useEffect(() => { if (initial) setForm(initial); }, [initial]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => { e.preventDefault(); onSubmit(form); };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initial?.id ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={submit} className="emp-form">
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handle} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handle} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input name="department" value={form.department} onChange={handle} required />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input name="salary" type="number" value={form.salary} onChange={handle} required />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn-save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
