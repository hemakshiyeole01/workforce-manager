package com.example.employeeservice.service;

import com.example.employeeservice.entity.Employee;
import com.example.employeeservice.repository.EmployeeRepo;
import com.example.employeeservice.response.EmployeeResponce;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<EmployeeResponce> getAllEmployees() {
        return employeeRepo.findAll()
                .stream()
                .map(emp -> mapper.map(emp, EmployeeResponce.class))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeResponce getEmployeeById(int id) {
        Employee employee = employeeRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Employee not found with id: " + id));
        return mapper.map(employee, EmployeeResponce.class);
    }

    @Override
    public EmployeeResponce addEmployee(EmployeeResponce request) {
        Employee employee = mapper.map(request, Employee.class);
        Employee saved = employeeRepo.save(employee);
        return mapper.map(saved, EmployeeResponce.class);
    }

    @Override
    public EmployeeResponce updateEmployee(int id, EmployeeResponce request) {
        Employee existing = employeeRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Employee not found with id: " + id));
        existing.setName(request.getName());
        existing.setEmail(request.getEmail());
        existing.setAge(request.getAge());
        existing.setDepartment(request.getDepartment());
        existing.setSalary(request.getSalary());
        Employee updated = employeeRepo.save(existing);
        return mapper.map(updated, EmployeeResponce.class);
    }

    @Override
    public void deleteEmployee(int id) {
        if (!employeeRepo.existsById(id)) {
            throw new NoSuchElementException("Employee not found with id: " + id);
        }
        employeeRepo.deleteById(id);
    }
}