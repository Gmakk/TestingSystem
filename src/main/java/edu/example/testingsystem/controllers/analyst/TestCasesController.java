package edu.example.testingsystem.controllers.analyst;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.TestCase;
import edu.example.testingsystem.forms.TestCaseForm;
import edu.example.testingsystem.messaging.TestCaseMessagingService;
import edu.example.testingsystem.messaging.kafka.KafkaTestCaseMessagingService;
import edu.example.testingsystem.repos.ConnectionRepository;
import edu.example.testingsystem.repos.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("analyst/testCases")
@SessionAttributes("selectedProject")
public class TestCasesController {

    TestCaseRepository testCaseRepo;
    ConnectionRepository connectionRepo;
    TestCaseMessagingService messagingService;


    public TestCasesController(TestCaseRepository testCaseRepo, ConnectionRepository connectionRepo, KafkaTestCaseMessagingService messagingService) {
        this.testCaseRepo = testCaseRepo;
        this.connectionRepo = connectionRepo;
        this.messagingService = messagingService;
    }

    @GetMapping
    public String showTestCasesPage(Model model) {
        model.addAttribute("testCaseForm", new TestCaseForm());
        return "testCases";
    }

    @ModelAttribute("testCases")
    public List<TestCase> addTestCasesToModel(@ModelAttribute("selectedProject") Project project) {
        return testCaseRepo.findByProject(project);
    }

    @PostMapping(value="/alter", params="action=delete")
    @Transactional
    public String deleteTestCase(@ModelAttribute("chosenTestCase") TestCase testCase) {
        if(testCase.getId() == null)
            return "redirect:/analyst/testCases";
        //List<ScenarioCaseConnection> connections = connectionRepo.findByTestCase(testCase);
        //connectionRepo.deleteAll(connections);
        //testCase = testCaseRepo.findById(testCase.getId()).get();
        connectionRepo.deleteByTestCase(testCase);
        testCaseRepo.deleteById(testCase.getId());
        return "redirect:/analyst/testCases";
    }

    @PostMapping(value="/alter", params="action=change")
    public String changeTestCase(@ModelAttribute("chosenTestCase") TestCase testCase){
        if(testCase.getId() == null)
            return "redirect:/analyst/testCases";
        return "redirect:/analyst/testCases/" + testCase.getId();
    }

    @PostMapping("/add")
    public String addTestCase(@ModelAttribute("testCaseForm") TestCaseForm testCaseForm, @ModelAttribute("selectedProject") Project project) {
        TestCase testCase = testCaseForm.toTestCase(project);
        testCaseRepo.save(testCase);
        //messagingService.sendTestCase(testCase);
//        Test newTest = new Test("asd",123);
//        testMessagingService.sendTest(newTest);
        return "redirect:/analyst/testCases";
    }
}
