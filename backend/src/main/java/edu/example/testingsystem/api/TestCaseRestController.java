package edu.example.testingsystem.api;

import edu.example.testingsystem.entities.TestCase;
import edu.example.testingsystem.mapstruct.dto.TestCaseDto;
import edu.example.testingsystem.mapstruct.mapper.TestCaseMapper;
import edu.example.testingsystem.messaging.TestCaseMessagingService;
import edu.example.testingsystem.messaging.kafka.KafkaTestCaseMessagingService;
import edu.example.testingsystem.repos.ConnectionRepository;
import edu.example.testingsystem.repos.TestCaseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
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
    ConnectionRepository connectionRepo;

    @GetMapping("/{id}")
    public ResponseEntity<TestCaseDto> getTestCaseById(@PathVariable("id") Integer id) {
        Optional<TestCase> testCase = testCaseRepo.findById(id);
        if (testCase.isPresent()) {
            return ResponseEntity.ok(testCaseMapper.toDto(testCase.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TestCaseDto> patchTestCase(@PathVariable("id") Integer id, @RequestBody TestCaseDto testCaseDto) {
        Optional<TestCase> optionalTestCase = testCaseRepo.findById(id);
        if(optionalTestCase.isEmpty())
            return ResponseEntity.notFound().build();
        TestCase patched = testCaseMapper.patchTestCase(optionalTestCase.get(),testCaseDto);
        return ResponseEntity.ok(testCaseMapper.toDto(testCaseRepo.save(patched)));
    }

    @PostMapping
    public ResponseEntity<TestCaseDto> createTestCase(@RequestBody TestCaseDto testCaseDto) {
        TestCase savedTestCase = testCaseRepo.save(testCaseMapper.toTestCase(testCaseDto));
        return ResponseEntity.ok(testCaseMapper.toDto(savedTestCase));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<HttpStatus> deleteTestCase(@PathVariable("id") Integer id) {
        Optional<TestCase> optionalTestCase = testCaseRepo.findById(id);
        if(optionalTestCase.isEmpty())
            throw new NoSuchElementException("Attempt to delete test case with non-existing id " + id);
        connectionRepo.deleteByTestCase(optionalTestCase.get());
        testCaseRepo.deleteById(optionalTestCase.get().getId());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
