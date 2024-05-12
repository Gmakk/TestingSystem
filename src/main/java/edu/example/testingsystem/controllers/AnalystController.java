package edu.example.testingsystem.controllers;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.UserRepository;
import edu.example.testingsystem.security.WorkWithData;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/analyst")
@SessionAttributes("selectedProject")
public class AnalystController {

    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;

    public AnalystController(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepo = projectRepository;
        this.userRepo = userRepository;
    }

    @ModelAttribute("allProjects")
    public List<Project> addProjectsToModel() {
        return projectRepo.findAll();
    }

    @ModelAttribute("currentUser")
    public Userr addCurrentUserToModel() {
        return WorkWithData.getCurrentUser();
    }

    @GetMapping("/logout")
    public String logOut(){
        SecurityContextHolder.clearContext();
        return "/login";
    }

    @GetMapping
    public String showAnalystPage() {
        return "analyst";
    }

    @PostMapping("/projectName")
    public String showSelectedProjectData(@ModelAttribute("projectName") String projectName,Model model) {
        if(projectName.equals("0"))
            return "analyst";
        Project selectedProject = projectRepo.findById(projectName).get();
        model.addAttribute("selectedProject", selectedProject);
        return "analyst";
    }
}