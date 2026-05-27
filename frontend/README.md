# Frontend — Workforce Manager

Built with React + Axios + React Router. Connects to Spring Boot backend via REST API.

## Folder Structure

```
src/
├── context/
│   └── AuthContext.jsx       stores JWT token, role, username globally
├── services/
│   └── api.js                all Axios calls to backend, auto-attaches JWT
├── components/
│   ├── Navbar.jsx             top bar — brand, links, role badge, logout
│   ├── EmployeeTable.jsx      renders employee table, hides actions for non-admin
│   ├── EmployeeForm.jsx       modal form for add/edit employee
│   └── ProtectedRoute.jsx     blocks pages if not logged in or wrong role
├── pages/
│   ├── LoginPage.jsx          login form → saves token to localStorage
│   ├── EmployeeList.jsx       main page — list, search, add/edit/delete
│   └── Dashboard.jsx          admin only — stats cards + recent employees
├── App.jsx                    routing setup
├── main.jsx                   entry point
└── index.css                  all styles
```

## Routes

| Path | Page | Access |
|---|---|---|
| `/login` | LoginPage | Public |
| `/employees` | EmployeeList | All logged-in users |
| `/dashboard` | Dashboard | Admin only |

## API Calls (api.js)

| Function | Method | Endpoint |
|---|---|---|
| `loginUser` | POST | `/auth/login` |
| `getAllEmployees` | GET | `/employees` |
| `getEmployeeById` | GET | `/employees/{id}` |
| `addEmployee` | POST | `/employees` |
| `updateEmployee` | PUT | `/employees/{id}` |
| `deleteEmployee` | DELETE | `/employees/{id}` |

## Auth Flow

```
LoginPage → POST /auth/login
         ← { token, role, username }
         → saved to localStorage
         → AuthContext provides to all components
         → api.js interceptor attaches Bearer token to every request
```

## Setup

```bash
npm install
npm install axios react-router-dom
npm run dev
```

Runs on `http://localhost:5173`
