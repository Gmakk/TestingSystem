package edu.example.testingsystem.controllers;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.Scenario;
import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.forms.PopulateTestPlanForm;
import edu.example.testingsystem.forms.TestPlanForm;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.ScenarioRepository;
import edu.example.testingsystem.repos.TestPlanRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("analyst/testPlans")
@SessionAttributes("selectedProject")
public class TestPlansController {

    TestPlanRepository planRepo;
    ProjectRepository projectRepo;
    ScenarioRepository scenarioRepo;

    public TestPlansController(TestPlanRepository planRepository , ScenarioRepository scenarioRepo,
                               ProjectRepository projectRepo) {
        this.planRepo = planRepository;
        this.projectRepo = projectRepo;
        this.scenarioRepo = scenarioRepo;
    }

    @GetMapping
    public String showTestPlansPage(Model model) {
        model.addAttribute("testPlanForm", new TestPlanForm());
        model.addAttribute("populateTestPlanForm", new PopulateTestPlanForm());
        return "testPlans";
    }

    @ModelAttribute("allPlans")
    public List<TestPlan> addPlansToModel(@ModelAttribute("selectedProject") Project project) {
        return planRepo.findByProject(project);
    }

    @ModelAttribute("allScenarios")
    public List<Scenario> addScenariosToModel() {
        return scenarioRepo.findAll();
    }

    @PostMapping("/delete")
    public String processTestPlan(@ModelAttribute("testPlanId") Integer testPlanId) {
        if (testPlanId == 0)
            return "testPlans";
        planRepo.deleteById(testPlanId);
        return "redirect:/analyst/testPlans";
    }

    @PostMapping("/add")
    public String addTestPlan(@ModelAttribute("testPlanForm") TestPlanForm testPlanForm, @SessionAttribute("selectedProject") Project project) {
        planRepo.save(testPlanForm.toTestPlan(project));
        return "redirect:/analyst/testPlans";
    }

    @PostMapping("/populate")
    //TODO:удаление выбранных элементов
    public String populateTestPlan(@ModelAttribute("populateTestPlanForm") PopulateTestPlanForm form) {
        if(form.getTestPlanId() == 0)
            return "redirect:/analyst/testPlans";
        TestPlan plan = planRepo.findById(form.getTestPlanId()).get();
        plan.setScenarios(form.getScenarios());
        planRepo.save(plan);
        return "redirect:/analyst/testPlans";
    }


}
