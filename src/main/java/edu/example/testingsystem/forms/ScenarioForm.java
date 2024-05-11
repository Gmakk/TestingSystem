package edu.example.testingsystem.forms;

import edu.example.testingsystem.entities.Scenario;
import edu.example.testingsystem.security.WorkWithData;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@Data
public class ScenarioForm {
    private String scenarioTitle;

    public Scenario toScenario(){
        return new Scenario(null,scenarioTitle, WorkWithData.getCurrentUser(),null,null);
    }
}
