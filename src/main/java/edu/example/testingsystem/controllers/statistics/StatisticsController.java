package edu.example.testingsystem.controllers.statistics;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.Scenario;
import edu.example.testingsystem.entities.ScenarioCaseConnection;
import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.repos.ConnectionRepository;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.ScenarioRepository;
import edu.example.testingsystem.repos.TestPlanRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/statistics")
public class StatisticsController {

    ScenarioRepository scenarioRepo;
    ProjectRepository projectRepo;
    TestPlanRepository testPlanRepo;
    ConnectionRepository connectionRepo;

    public StatisticsController(ProjectRepository projectRepo, ConnectionRepository connectionRepo,
                                ScenarioRepository scenarioRepo, TestPlanRepository testPlanRepo) {
        this.projectRepo = projectRepo;
        this.connectionRepo = connectionRepo;
        this.scenarioRepo = scenarioRepo;
        this.testPlanRepo = testPlanRepo;
    }

    @GetMapping
    public String showStatisticsPage() {
        return "statistics";
    }

    @ModelAttribute("totalStatistics")
    public List<ProjectStatistics> addProjectsToModel() {
        //составляем статистику по каждому сценарию
        List<Scenario> allScenarios = scenarioRepo.findAll();
        List<ScenarioStatistics> scenarioStatistics = new ArrayList<>();
        for (Scenario scenario : allScenarios) {
            scenarioStatistics.add(new ScenarioStatistics(scenario,connectionRepo.countByScenario(scenario),
                    connectionRepo.countByScenarioAndPassedIsTrue(scenario)));
        }


        //составляем статистику по каждому тест-плану
        List<TestPlanStatistics> testPlanStatistics = new ArrayList<>();
        List<TestPlan> allTestPlans = testPlanRepo.findAll();
        for (TestPlan testPlan : allTestPlans) {
            List<ScenarioStatistics> scenarioStatisticsForTestPlan = scenarioStatistics.stream()
                    .filter(scenarioStat -> testPlan.getScenarios().contains(scenarioStat.getScenario())).toList();//если у тест плана есть такой сценарий
            testPlanStatistics.add(new TestPlanStatistics(testPlan,
                    scenarioStatisticsForTestPlan.stream().mapToInt(ScenarioStatistics::getTotal).sum(),
                    scenarioStatisticsForTestPlan.stream().mapToInt(ScenarioStatistics::getPassed).sum(),
                    scenarioStatisticsForTestPlan));
        }


        //составляем статистику по каждому проекту
        List<ProjectStatistics> projectStatistics = new ArrayList<>();
        List<Project> allProjects = projectRepo.findAll();
        for (Project project : allProjects) {
            List<TestPlanStatistics> testPlanStatisticsForProject = testPlanStatistics.stream()
                    .filter(testPlanStat -> testPlanStat.getTestPlan().getProject().equals(project)).toList();
            projectStatistics.add(new ProjectStatistics(project,
                    testPlanStatisticsForProject.stream().mapToInt(TestPlanStatistics::getTotal).sum(),
                    testPlanStatisticsForProject.stream().mapToInt(TestPlanStatistics::getPassed).sum(),
                    testPlanStatisticsForProject));
        }
        return projectStatistics;
    }
}
