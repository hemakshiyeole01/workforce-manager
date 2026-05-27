package com.example.employeeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class EmployeeServiceApplication {

    public static void main(String[] args) {

        SpringApplication.run(EmployeeServiceApplication.class, args);
        //System.out.println(new BCryptPasswordEncoder().encode("password123"));
    }

}
