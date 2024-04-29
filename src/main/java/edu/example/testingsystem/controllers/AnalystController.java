package edu.example.testingsystem.controllers;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.repos.ProjectRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/analyst")
public class AnalystController {

    private final ProjectRepository projectRepo;

    public AnalystController(ProjectRepository projectRepository) {
        this.projectRepo = projectRepository;
    }

    @ModelAttribute
    public void getDataForView(Model model) {
        model.addAttribute("allProjects", projectRepo.findAll());
    }

    @GetMapping
    public String showAnalystPage() {
        return "analyst";
    }

    @PostMapping("/selectedProject")
    public String showSelectedProjectData(@ModelAttribute("selectedProject") String projectName) {
        System.out.println(projectName);
        return "analyst";
    }




}
