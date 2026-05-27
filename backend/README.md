# Backend — Workforce Manager

Built with Spring Boot 4, Spring Security, JWT, Spring Data JPA, and MySQL using H2 database.

## Folder Structure

```
src/main/java/com/example/employeeservice/
├── EmployeeServiceApplication.java    entry point, starts the app
├── configuration/
│   ├── EmployeeConfig.java            Spring beans — ModelMapper, CORS
│   └── SecurityConfig.java            JWT filter chain, role-based access rules
├── controller/
│   ├── EmployeeController.java        handles /employees HTTP requests
│   └── AuthController.java            handles /auth/login and /auth/register
├── entity/
│   ├── Employee.java                  maps to `employee` table in DB
│   └── User.java                      maps to `users` table, holds credentials + role
├── repository/
│   ├── EmployeeRepo.java              JPA queries for employees
│   └── UserRepo.java                  JPA queries for users, findByUsername
├── service/
│   ├── EmployeeService.java           interface defining employee operations
│   └── EmployeeServiceImpl.java       implementation of employee operations
├── security/
│   ├── JwtUtil.java                   generates and validates JWT tokens
│   └── JwtFilter.java                 intercepts every request, checks Bearer token
├── response/
│   ├── EmployeeResponce.java          DTO — employee data sent to frontend
│   ├── LoginRequest.java              holds username + password from login
│   └── JwtResponse.java              holds token + username + role sent after login
└── exception/
    └── GlobalExceptionHandler.java    catches errors app-wide, returns clean JSON
```

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register new user |
| POST | `/auth/login` | Public | Login, returns JWT |
| GET | `/employees` | Admin + Employee | Get all employees |
| GET | `/employees/{id}` | Admin + Employee | Get employee by ID |
| POST | `/employees` | Admin only | Add new employee |
| PUT | `/employees/{id}` | Admin only | Update employee |
| DELETE | `/employees/{id}` | Admin only | Delete employee |

## Auth Flow

```
POST /auth/login { username, password }
→ Spring Security validates credentials
→ JwtUtil generates token with role claim
← { token, role, username }

Every subsequent request:
→ JwtFilter extracts Bearer token from header
→ JwtUtil validates token
→ Sets SecurityContext with user + role
→ SecurityConfig allows or blocks based on role
```

## Database Tables

```sql
-- users table
id | username | password (BCrypt) | role

-- employee table
id | name | email | age | department | salary
```

## Setup

```bash
# Configure application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/employeeDB
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

# Run
mvn spring-boot:run
```

Runs on `http://localhost:8080`
