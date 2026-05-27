package com.example.employeeservice.service;

import com.example.employeeservice.response.EmployeeResponce;
import java.util.List;

public interface EmployeeService {
    List<EmployeeResponce> getAllEmployees();
    EmployeeResponce getEmployeeById(int id);
    EmployeeResponce addEmployee(EmployeeResponce request);
    EmployeeResponce updateEmployee(int id, EmployeeResponce request);
    void deleteEmployee(int id);
}