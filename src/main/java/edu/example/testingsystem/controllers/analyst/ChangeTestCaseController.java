package edu.example.testingsystem.controllers.analyst;

import edu.example.testingsystem.entities.TestCase;
import edu.example.testingsystem.forms.TestCaseForm;
import edu.example.testingsystem.repos.TestCaseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Controller
@RequestMapping("analyst/testCases/{id}")
public class ChangeTestCaseController {

    private final TestCaseRepository testCaseRepo;

    public ChangeTestCaseController(TestCaseRepository testCaseRepo) {
        this.testCaseRepo = testCaseRepo;
    }

    @GetMapping
    public String showTestCasePage(Model model, @PathVariable("id") Integer id) {
        TestCase testCase = findTestCase(id);

        TestCaseForm testCaseForm = new TestCaseForm();

        testCaseForm.setTestCaseDescription(testCase.getDescription());
        testCaseForm.setTestCaseTitle(testCase.getTitle());
        testCaseForm.setInputData(testCase.getInputData());
        testCaseForm.setOutputData(testCase.getOutputData());

        model.addAttribute("changeTestCaseForm", testCaseForm);
        return "changeTestCase";
    }

    @PostMapping("/submit")
    public String submitChanges(@ModelAttribute("testCaseForm") TestCaseForm testCaseForm, @PathVariable("id") Integer id) {
        TestCase testCase = findTestCase(id);

        testCase.setTitle(testCaseForm.getTestCaseTitle());
        testCase.setInputData(testCaseForm.getInputData());
        testCase.setOutputData(testCaseForm.getOutputData());
        testCase.setDescription(testCaseForm.getTestCaseDescription());

        testCaseRepo.save(testCase);
        return "redirect:/analyst/testCases";
    }

    private TestCase findTestCase(Integer id) {
        Optional<TestCase> testCase = testCaseRepo.findById(id);
        if(testCase.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }else
            return testCase.get();
    }
}
