import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, role } = useAuth();
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await loginUser(form);
      const role = res.data.role?.replace("ROLE_", ""); // ROLE_ADMIN → ADMIN
      login(res.data.token, role, res.data.username || form.username);
      navigate(res.data.role === "ADMIN" ? "/dashboard" : "/employees");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">⚡</span>
          <h1>EmpSystem</h1>
          <p>Sign in to your account</p>
        </div>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input name="username" value={form.username} onChange={handle} placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handle} placeholder="Enter password" required />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="login-hint">Admin: full access &nbsp;|&nbsp; Employee: read only</p>
      </div>
    </div>
  );
}
