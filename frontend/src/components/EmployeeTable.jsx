import { useAuth } from "../context/AuthContext";

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  const { role } = useAuth();
  const isAdmin = role === "ADMIN";

  return (
    <div className="table-wrapper">
      <table className="emp-table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Email</th><th>Department</th><th>Salary</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan={isAdmin ? 6 : 5} className="no-data">No employees found</td></tr>
          ) : employees.map((emp, i) => (
            <tr key={emp.id} className="table-row">
              <td className="idx">{i + 1}</td>
              <td className="name">{emp.name}</td>
              <td className="email">{emp.email}</td>
              <td><span className="dept-tag">{emp.department}</span></td>
              <td className="salary">₹{Number(emp.salary).toLocaleString()}</td>
              {isAdmin && (
                <td className="actions">
                  <button className="btn-edit" onClick={() => onEdit(emp)}>Edit</button>
                  <button className="btn-delete" onClick={() => onDelete(emp.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
