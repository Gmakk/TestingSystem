package edu.example.testingsystem.controllers.director;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.security.WorkWithData;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/director")
@SessionAttributes("selectedProject")
public class DirectorController {

    ProjectRepository projectRepo;

    public DirectorController(ProjectRepository projectRepo) {
        this.projectRepo = projectRepo;
    }

    @GetMapping
    public String showDirectorPage() {
        return "director";
    }

    @ModelAttribute("projects")
    public List<Project> addProjectsToModel() {
        return projectRepo.findAll();
    }

    @PostMapping("/projectName")
    public String becomeProjectDirector(@ModelAttribute("projectName") String projectName, Model model){
        if(projectName.equals("0"))
            return "director";
        System.out.println(projectName);
        Project selectedProject = projectRepo.findById(projectName).get();
        selectedProject.setDirector(WorkWithData.getCurrentUser());
        projectRepo.save(selectedProject);
        model.addAttribute("selectedProject", selectedProject);
        return "redirect:/director/manageProject";
    }
}
