package edu.example.testingsystem.controllers;

import edu.example.testingsystem.entities.*;
import edu.example.testingsystem.forms.PopulateScenarioForm;
import edu.example.testingsystem.forms.ScenarioForm;
import edu.example.testingsystem.repos.ConnectionRepository;
import edu.example.testingsystem.repos.ScenarioRepository;
import edu.example.testingsystem.repos.TestCaseRepository;
import edu.example.testingsystem.repos.TestPlanRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("analyst/scenarios")
@SessionAttributes("selectedProject")
public class ScenariosController {

    ScenarioRepository scenarioRepo;
    ConnectionRepository connectionRepo;
    TestPlanRepository planRepo;
    TestCaseRepository testCaseRepo;

    public ScenariosController(ScenarioRepository scenarioRepo, ConnectionRepository connectionRepo,
                               TestPlanRepository testPlanRepo, TestCaseRepository testCaseRepo) {
        this.scenarioRepo = scenarioRepo;
        this.connectionRepo = connectionRepo;
        this.planRepo = testPlanRepo;
        this.testCaseRepo = testCaseRepo;
    }

    @GetMapping
    public String showScenariosPage(Model model) {
        model.addAttribute("scenarioForm", new ScenarioForm());
        model.addAttribute("populateScenarioForm", new PopulateScenarioForm());
        return "scenarios";
    }

    @ModelAttribute("allScenarios")
    public List<Scenario> addScenariosToModel(@ModelAttribute("selectedProject") Project project) {
        //все тест планы текущего проекта
        //все сценарии этих тест планов
//        List<TestPlan> allProjectPlans =  planRepo.findByProject(project);
//        List<Scenario> allScenarios = new ArrayList<>();
//        for(TestPlan testPlan : allProjectPlans) {
//            allScenarios.addAll(testPlan.getScenarios());
//        }
//        return allScenarios;
        return scenarioRepo.findAll();
    }

    @ModelAttribute("allTestCases")
    public List<TestCase> addTestCasesToModel(@ModelAttribute("selectedProject") Project project) {
        return testCaseRepo.findByProject(project);
    }

    @PostMapping("/delete")
    public String processTestPlan(@ModelAttribute("scenarioId") Integer scenarioId) {
        if (scenarioId == 0)
            return "scenarios";
        connectionRepo.deleteByScenario(scenarioRepo.findById(scenarioId).get());
        scenarioRepo.deleteById(scenarioId);
        return "redirect:/analyst/scenarios";
    }

    @PostMapping("/add")
    public String addScenario(@ModelAttribute("scenarioForm") ScenarioForm scenarioForm) {
        scenarioRepo.save(scenarioForm.toScenario());
        return "redirect:/analyst/scenarios";
    }

    @PostMapping("/populate")
    //TODO:удаление выбранных элементов
    public String populateScenario(@ModelAttribute("populateScenarioForm") PopulateScenarioForm form) {
        if(form.getScenarioID() == 0)
            return "scenarios";
        for(TestCase testCase : form.getTestCases())
            connectionRepo.save(new ScenarioCaseConnection(null,null,false,scenarioRepo.findById(form.getScenarioID()).get(),testCase));
        return "redirect:/analyst/scenarios";
    }
}
