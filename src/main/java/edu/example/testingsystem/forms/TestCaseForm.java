package edu.example.testingsystem.forms;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.TestCase;
import edu.example.testingsystem.security.WorkWithData;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@Data
public class TestCaseForm {
    private String testCaseTitle;
    private String testCaseDescription;
    private String inputData;
    private String outputData;

    public TestCase toTestCase(Project project) {
        return new TestCase(null,testCaseTitle,project,
                WorkWithData.getCurrentUser(),testCaseDescription,inputData,outputData);
    }
}
