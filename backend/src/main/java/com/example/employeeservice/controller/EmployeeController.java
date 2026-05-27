package com.example.employeeservice.controller;

import com.example.employeeservice.response.EmployeeResponce;
import com.example.employeeservice.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeResponce>> getAllEmployees() {
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponce> getEmployeeDetails(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.getEmployeeById(id));
    }

    @PostMapping
    public ResponseEntity<EmployeeResponce> addEmployee(@RequestBody EmployeeResponce request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.addEmployee(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponce> updateEmployee(@PathVariable int id, @RequestBody EmployeeResponce request) {
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.updateEmployee(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable int id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}