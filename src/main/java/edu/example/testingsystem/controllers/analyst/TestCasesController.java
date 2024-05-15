package edu.example.testingsystem.controllers.analyst;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.TestCase;
import edu.example.testingsystem.forms.TestCaseForm;
import edu.example.testingsystem.repos.ConnectionRepository;
import edu.example.testingsystem.repos.TestCaseRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("analyst/testCases")
@SessionAttributes("selectedProject")
public class TestCasesController {

    TestCaseRepository testCaseRepo;
    ConnectionRepository connectionRepo;

    public TestCasesController(TestCaseRepository testCaseRepo, ConnectionRepository connectionRepo) {
        this.testCaseRepo = testCaseRepo;
        this.connectionRepo = connectionRepo;
    }

    @GetMapping
    public String showTestCasesPage(Model model) {
        model.addAttribute("testCaseForm", new TestCaseForm());
        return "testCases";
    }

    @ModelAttribute("allTestCases")
    public List<TestCase> addTestCasesToModel(@ModelAttribute("selectedProject") Project project) {
        return testCaseRepo.findByProject(project);
    }

    @PostMapping("/delete")
    public String deleteTestCase(@ModelAttribute("testCaseId") Integer testCaseId) {
        if(testCaseId == 0)
            return "testCases";
        connectionRepo.deleteByTestCase(testCaseRepo.findById(testCaseId).get());
        testCaseRepo.deleteById(testCaseId);
        return "redirect:/analyst/testCases";

    }

    @PostMapping("/add")
    public String addTestCase(@ModelAttribute("testCaseForm") TestCaseForm testCaseForm, @ModelAttribute("selectedProject") Project project) {
        testCaseRepo.save(testCaseForm.toTestCase(project));
        return "redirect:/analyst/testCases";
    }
}
