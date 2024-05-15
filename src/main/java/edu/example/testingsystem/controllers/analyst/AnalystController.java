package edu.example.testingsystem.controllers.analyst;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.Requirement;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.RequirementRepository;
import edu.example.testingsystem.repos.UserRepository;
import edu.example.testingsystem.security.WorkWithData;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/analyst")
@SessionAttributes("selectedProject")
public class AnalystController {

    private final ProjectRepository projectRepo;
    private final RequirementRepository requirementRepo;

    public AnalystController(ProjectRepository projectRepository, RequirementRepository requirementRepository) {
        this.projectRepo = projectRepository;
        this.requirementRepo = requirementRepository;
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
        List<Requirement> requirements = requirementRepo.findByProject(selectedProject);
        model.addAttribute("requirements", requirements);
        return "analyst";
    }
}