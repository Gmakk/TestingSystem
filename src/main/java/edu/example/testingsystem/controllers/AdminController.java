package edu.example.testingsystem.controllers;

import edu.example.testingsystem.entities.Role;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.forms.RoleAssigningForm;
import edu.example.testingsystem.repos.RoleRepository;
import edu.example.testingsystem.repos.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private UserRepository userRepo;
    private RoleRepository roleRepo;

    public AdminController(UserRepository userRepo, RoleRepository roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    @ModelAttribute("users")
    public List<Userr> addUsersToModel(){
        return userRepo.findAll();
    }

    @ModelAttribute("roles")
    public List<Role> addRolesToModel(){
        return roleRepo.findAll();
    }

    @GetMapping
    public String showAdminPage(Model model) {
        model.addAttribute("assignForm", new RoleAssigningForm());
        return "admin";
    }

    @PostMapping("/assignRole")
    public String assignRole(@ModelAttribute("assignForm") RoleAssigningForm form, Model model) {
        if(form == null || form.getRole() == null || form.getUser() == null)
            return "redirect:/admin";
        form.getUser().setRole(form.getRole());
        userRepo.save(form.getUser());
        return "redirect:/admin";
    }
}
