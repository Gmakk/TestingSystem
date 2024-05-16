package edu.example.testingsystem.controllers.director;

import edu.example.testingsystem.entities.*;
import edu.example.testingsystem.forms.ProjectManagementForm;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.RoleRepository;
import edu.example.testingsystem.repos.TestPlanRepository;
import edu.example.testingsystem.repos.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/director/manageProject")
@SessionAttributes("selectedProject")
public class ProjectManagementController {

    TestPlanRepository planRepo;
    ProjectRepository projectRepo;
    UserRepository userRepo;
    RoleRepository roleRepo;

    public ProjectManagementController(TestPlanRepository planRepo, ProjectRepository projectRepo,
                                       UserRepository userRepo, RoleRepository roleRepo) {
        this.planRepo = planRepo;
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    @GetMapping
    public String showManageProjectPage(Model model) {
        model.addAttribute("assignForm", new ProjectManagementForm());
        return "manageProject";
    }

    @ModelAttribute("testPlans")
    public List<TestPlan> addTestPlansToModel(@ModelAttribute("selectedProject") Project selectedProject) {
        return planRepo.findByProjectAndApprovedIsFalse(selectedProject);
    }

    @ModelAttribute("testers")
    public List<Userr> addTestersToModel() {
        Role role = roleRepo.findById("tester").isPresent() ? roleRepo.findById("tester").get() : null;
        if(role == null)
            throw new RuntimeException("Tester role was not found in the database");
        return userRepo.findByRole(role);
    }

    @ModelAttribute("scenarios")
    public List<Scenario> addScenariosToModel(@ModelAttribute("selectedProject") Project selectedProject) {
        List<TestPlan> testPlans = planRepo.findByProjectAndApprovedIsTrue(selectedProject);
        List<Scenario> scenarios = new ArrayList<>();
        for (TestPlan testPlan : testPlans) {
            scenarios.addAll(testPlan.getScenarios());
        }
        return scenarios;
        //return scenarioRepo.findAll();
    }

    @PostMapping("/approve")
    public String approveTestPlans(@ModelAttribute("approvedPlans") ArrayList<TestPlan> approvedPlans) {
        for (TestPlan testPlan : approvedPlans) {
            testPlan.setApproved(true);
        }
        planRepo.saveAll(approvedPlans);
        return "redirect:/director/manageProject";
    }

    @PostMapping("/assign")
    public String assignScenarioToTester(@ModelAttribute("assignForm") ProjectManagementForm form){
        if(form.getFormScenarios() == null || form.getFormTester() == null)
            return "manageProject";
        for(Scenario scenario : form.getFormScenarios() ){
            scenario.setExecutor(form.getFormTester());
        }
        return "redirect:/director/manageProject";
    }
}
