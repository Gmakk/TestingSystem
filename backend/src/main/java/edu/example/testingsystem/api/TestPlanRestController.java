package edu.example.testingsystem.api;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.mapstruct.dto.TestPlanDto;
import edu.example.testingsystem.mapstruct.mapper.TestPlanMapper;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.TestPlanRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testplan")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class TestPlanRestController {
    TestPlanRepository testPlanRepository;
    ProjectRepository projectRepository;
    TestPlanMapper testPlanMapper;

    @GetMapping("/all")
    public List<Integer> getAll() {
        return testPlanRepository.findAll().stream().map(testPlan -> testPlan.getId()).toList();
    }

    @GetMapping("/unapproved")
    public ResponseEntity<List<Integer>> getUnapproved(String projectTitle) {
        Project project = projectRepository.findById(projectTitle).get();
        return ResponseEntity.ok(testPlanRepository.findByProjectAndApprovedIsFalse(project).stream().map(testPlan -> testPlan.getId()).toList());
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Integer>> getApproved(String projectTitle) {
        Project project = projectRepository.findById(projectTitle).get();
        return ResponseEntity.ok(testPlanRepository.findByProjectAndApprovedIsTrue(project).stream().map(testPlan -> testPlan.getId()).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestPlanDto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(testPlanMapper.toDto(testPlanRepository.findById(id).get()));
    }

    @PatchMapping("/approve")
    public ResponseEntity<HttpStatus> approve(@RequestBody List<Integer> approvedPlans) {
        for (Integer testPlan : approvedPlans) {
            TestPlan testPlanObject = testPlanRepository.findById(testPlan).get();
            testPlanObject.setApproved(true);
            testPlanRepository.save(testPlanObject);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
