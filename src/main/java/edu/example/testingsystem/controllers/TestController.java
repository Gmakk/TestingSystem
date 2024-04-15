package edu.example.testingsystem.controllers;

import edu.example.testingsystem.entities.Role;
import edu.example.testingsystem.repos.RoleRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    private RoleRepository roleRepository;

    public TestController(RoleRepository rep){
        roleRepository = rep;
    }

    @GetMapping("/")
    public String doSmt(){
        roleRepository.save(new Role("admin","Rules everything"));
        return "home";
    }
}
