package edu.example.testingsystem.api;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.Scenario;
import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.mapstruct.dto.ProjectDto;
import edu.example.testingsystem.mapstruct.dto.ScenarioDto;
import edu.example.testingsystem.mapstruct.mapper.ScenarioMapper;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.ScenarioRepository;
import edu.example.testingsystem.repos.TestPlanRepository;
import edu.example.testingsystem.repos.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/scenario")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ScenarioRestController {
    ScenarioMapper scenarioMapper;
    ProjectRepository projectRepository;
    TestPlanRepository testPlanRepository;
    ScenarioRepository scenarioRepository;
    UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<ScenarioDto> getScenarioById(@PathVariable("id") Integer id) {
        Optional<Scenario> scenario = scenarioRepository.findById(id);
        if (scenario.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(scenarioMapper.toDto(scenario.get()), HttpStatus.OK);
    }

    @PatchMapping("/assign")
    public ResponseEntity<List<ScenarioDto>> assignScenarioToTester(@RequestBody ScenarioDto scenarioDto) {
        Optional<Userr> optionalExecutor = userRepository.findById(scenarioDto.executor());
        if (optionalExecutor.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        Userr executor = optionalExecutor.get();
        Scenario scenario;
        List<Scenario> scenarios = new ArrayList<>();
        for(Integer scenarioId : scenarioDto.scenariosToTester()){
            Optional<Scenario> scenarioOptional = scenarioRepository.findById(scenarioId);
            if(scenarioOptional.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            scenario = scenarioOptional.get();
            scenario.setExecutor(executor);
            scenarios.add(scenario);
        }
        return ResponseEntity.ok(scenarioMapper.toDtos(scenarioRepository.saveAll(scenarios)));
    }

    @GetMapping("/byproject/{title}")
    public ResponseEntity<List<ScenarioDto>> getScenariosByProject(@PathVariable("title") String title){
        Optional<Project> optionalProject= projectRepository.findById(title);
        if(!optionalProject.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        List<TestPlan> testPlans = testPlanRepository.findByProjectAndApprovedIsTrue(optionalProject.get());
        Set<Scenario> scenarios = new HashSet<>();//чтобы избежать дубликатов, когда один сценарий в двух планах
        for (TestPlan testPlan : testPlans) {
            scenarios.addAll(testPlan.getScenarios());
        }
        List<Scenario> scenarioList = new ArrayList<>();
        scenarioList.addAll(scenarios);
        return ResponseEntity.ok(scenarioMapper.toDtos(scenarioList));
    }
}
