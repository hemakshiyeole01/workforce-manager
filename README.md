# Workforce Manager

A full-stack web application to manage employee data within an organization. Admins can add, update, and delete employee records, while employees can only view the directory.

## Features

- Secure login with JWT authentication
- Role-based access (Admin / Employee)
- View, add, edit, delete employee records
- Responsive dark-themed UI

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 17 | Programming language |
| Spring Boot 4 | Backend framework |
| Spring Security | Authentication & authorization |
| JWT (jjwt) | Token-based stateless auth |
| Spring Data JPA | Database operations |
| Hibernate | ORM — maps Java objects to DB tables |
| MySQL | Relational database |
| Maven | Dependency management |

### Frontend
| Technology | Purpose |
|---|---|
| React | UI framework |
| Axios | HTTP requests to backend |
| React Router | Page navigation |

## Architecture

```
Frontend (React) → localhost:5173
      ↓  HTTP + JWT
Backend (Spring Boot) → localhost:8080
      ↓  JPA / Hibernate
Database (MySQL) → localhost:3306
```

## Role-Based Access

| Action | Employee | Admin |
|---|---|---|
| View employees | ✅ | ✅ |
| Add employee | ❌ | ✅ |
| Edit employee | ❌ | ✅ |
| Delete employee | ❌ | ✅ |
| View dashboard | ❌ | ✅ |

## Getting Started

### 1. Start the backend
```bash
cd employee-backend
mvn spring-boot:run
```

### 2. Start the frontend
```bash
cd employee-frontend
npm install
npm run dev
```

### 3. Open in browser
```
http://localhost:5173
```

### 4. Register a user via Postman
```
POST http://localhost:8080/auth/register
{
  "username": "admin",
  "password": "admin123",
  "role": "ROLE_ADMIN"
}
```
