import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const login = (tok, rol, user) => {
    localStorage.setItem("token", tok);
    localStorage.setItem("role", rol);
    localStorage.setItem("username", user);
    setToken(tok); setRole(rol); setUsername(user);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null); setRole(null); setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
