package edu.example.testingsystem.api;

import edu.example.testingsystem.entities.TestCase;
import edu.example.testingsystem.mapstruct.dto.TestCaseDto;
import edu.example.testingsystem.mapstruct.mapper.TestCaseMapper;
import edu.example.testingsystem.messaging.TestCaseMessagingService;
import edu.example.testingsystem.messaging.kafka.KafkaTestCaseMessagingService;
import edu.example.testingsystem.repos.TestCaseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//TODO: PageRequest? ResponseEntity? CrossOrigin?


@RestController
@RequestMapping("/api/testCase")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class TestCaseRestController {
    TestCaseRepository testCaseRepo;
    TestCaseMessagingService messagingService;
    TestCaseMapper testCaseMapper;

    @GetMapping(params = "recent")
    public List<TestCase> getRecentTestCases() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("id"));
        return testCaseRepo.findAll(pageRequest).getContent();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestCaseDto> getTestCaseById(@PathVariable("id") Integer id) {
        Optional<TestCase> testCase = testCaseRepo.findById(id);
        if (testCase.isPresent()) {
            return ResponseEntity.ok(testCaseMapper.toDto(testCase.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public TestCase createTestCase(@RequestBody TestCase testCase) {



        //messagingService.sendTestCase(testCase);


        return testCaseRepo.save(testCase);
    }

    //полная замена содержимого по указанному id
    @PutMapping(path = "/{id}", consumes = "application/json")
    public TestCase updateTestCase(@PathVariable("id") Integer id, @RequestBody TestCase testCase) {
        testCase.setId(id);
        return testCaseRepo.save(testCase);
    }

    //частичная замена содержимого по указанному id
    @PatchMapping(path = "/{id}", consumes = "application/json")
    public TestCase patchTestCase(@PathVariable("id") Integer id, @RequestBody TestCase patch) {
        TestCase testCase = testCaseRepo.findById(id).get();
        if(patch.getTitle() != null) {
            testCase.setTitle(patch.getTitle());
        }
        if(patch.getProject() != null) {
            testCase.setProject(patch.getProject());
        }
        if(patch.getCreator() != null) {
            testCase.setCreator(patch.getCreator());
        }
        if(patch.getDescription() != null) {
            testCase.setDescription(patch.getDescription());
        }
        if(patch.getInputData() != null) {
            testCase.setInputData(patch.getInputData());
        }
        if(patch.getOutputData() != null) {
            testCase.setOutputData(patch.getOutputData());
        }
        return testCaseRepo.save(testCase);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTestCase(@PathVariable("id") Integer id) {
        try{
            testCaseRepo.deleteById(id);
        }catch (EmptyResultDataAccessException ex) {}
    }

}
