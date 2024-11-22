package edu.example.testingsystem.api;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.mapstruct.dto.ProjectDto;
import edu.example.testingsystem.mapstruct.dto.TestPlanDto;
import edu.example.testingsystem.mapstruct.mapper.TestPlanMapper;
import edu.example.testingsystem.repos.ConnectionRepository;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.TestPlanRepository;
import edu.example.testingsystem.repos.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/testplan")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class TestPlanRestController {
    TestPlanRepository testPlanRepository;
    ProjectRepository projectRepository;
    TestPlanMapper testPlanMapper;
    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<List<TestPlanDto>> getAll() {
        List<TestPlan> testPlanDtoList = testPlanRepository.findAll();
        return ResponseEntity.ok(testPlanMapper.toDtos(testPlanDtoList));
    }

    @GetMapping("/unapproved")
    public ResponseEntity<List<TestPlanDto>> getUnapproved(@RequestBody ProjectDto projectTitle) {
        Project project = projectRepository.findById(projectTitle.title()).get();
        return ResponseEntity.ok(testPlanMapper.toDtos(testPlanRepository.findByProjectAndApprovedIsFalse(project)));
    }

    @GetMapping("/approved")
    public ResponseEntity<List<TestPlanDto>> getApproved(@RequestBody ProjectDto projectTitle) {
        Project project = projectRepository.findById(projectTitle.title()).get();
        return ResponseEntity.ok(testPlanMapper.toDtos(testPlanRepository.findByProjectAndApprovedIsTrue(project)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestPlanDto> getById(@PathVariable("id") Integer id) {
        Optional<TestPlan> testPlanOptional = testPlanRepository.findById(id);
        if(testPlanOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(testPlanMapper.toDto(testPlanOptional.get()));
    }

    @PatchMapping("/approve")
    public ResponseEntity<HttpStatus> approve(@RequestBody ProjectDto approvedPlans) {
        for (Integer testPlan : approvedPlans.testPlanIds()) {
            TestPlan testPlanObject = testPlanRepository.findById(testPlan).get();
            testPlanObject.setApproved(true);
            testPlanRepository.save(testPlanObject);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TestPlanDto> create(@RequestBody TestPlanDto testPlanDto) {
        Optional<Userr> optionalUser = userRepository.findById(testPlanDto.creatorId());
        if(optionalUser.isEmpty())
            return ResponseEntity.notFound().build();
        Optional<Project> optionalProject = projectRepository.findById(testPlanDto.projectTitle());
        if(optionalProject.isEmpty())
            return ResponseEntity.notFound().build();
        TestPlan newTestPlan =  testPlanRepository.save(testPlanMapper.toTestPlan(testPlanDto,optionalUser.get(),optionalProject.get()));
        return ResponseEntity.ok(testPlanMapper.toDto(newTestPlan));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
        Optional<TestPlan> testPlanOptional = testPlanRepository.findById(id);
        if(testPlanOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        connectionRepository.deleteByTestPlan(testPlanOptional.get());
        testPlanRepository.delete(testPlanOptional.get());
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
