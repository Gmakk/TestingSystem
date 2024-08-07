package edu.example.testingsystem.controllers.director;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.security.WorkWithData;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @ModelAttribute("currentUser")
    public Userr addCurrentUserToModel() {
        return WorkWithData.getCurrentUser();
    }

    @GetMapping("/logout")
    public String logOut(){
        SecurityContextHolder.clearContext();
        return "/login";
    }

    @PostMapping("/projectName")
    public String becomeProjectDirector(@ModelAttribute("projectName") Project project, Model model){
        if(project.getTitle() == null)
            return "redirect:/director";
        //Project selectedProject = projectRepo.findById(projectName).get();
        project.setDirector(WorkWithData.getCurrentUser());
        projectRepo.save(project);
        model.addAttribute("selectedProject", project);
        return "redirect:/director/manageProject";
    }
}
