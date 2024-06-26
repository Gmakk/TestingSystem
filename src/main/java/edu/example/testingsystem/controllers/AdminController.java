package edu.example.testingsystem.controllers;

import edu.example.testingsystem.entities.Role;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.forms.RoleAssigningForm;
import edu.example.testingsystem.repos.RoleRepository;
import edu.example.testingsystem.repos.UserRepository;
import edu.example.testingsystem.security.WorkWithData;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

    @ModelAttribute("currentUser")
    public Userr addCurrentUserToModel() {
        return WorkWithData.getCurrentUser();
    }

    @GetMapping
    public String showAdminPage(Model model) {
        model.addAttribute("assignForm", new RoleAssigningForm());
        return "admin";
    }

    @GetMapping("/logout")
    public String logOut(){
        SecurityContextHolder.clearContext();
        return "/login";
    }

    @PostMapping("/assignRole")
    public String assignRole(@ModelAttribute("assignForm") RoleAssigningForm form) {
        if(form == null || form.getRole() == null || form.getUser() == null)
            return "redirect:/admin";
        form.getUser().setRole(form.getRole());
        userRepo.save(form.getUser());
        return "redirect:/admin";
    }
}
