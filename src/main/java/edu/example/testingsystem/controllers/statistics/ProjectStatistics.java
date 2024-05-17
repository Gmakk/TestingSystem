package edu.example.testingsystem.controllers.statistics;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.TestPlan;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectStatistics {
    private Project project;
    private Integer total;
    private Integer passed;
    private List<TestPlanStatistics> testPlanStatistics;
}
