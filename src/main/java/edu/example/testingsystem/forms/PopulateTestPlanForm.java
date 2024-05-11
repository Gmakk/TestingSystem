package edu.example.testingsystem.forms;

import edu.example.testingsystem.entities.Scenario;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class PopulateTestPlanForm {
    private Integer testPlanId;
    private List<Scenario> scenarios;
}
