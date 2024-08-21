package edu.example.testingsystem.controllers.statistics;

import com.google.gson.*;
import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.Scenario;
import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.repos.ConnectionRepository;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.ScenarioRepository;
import edu.example.testingsystem.repos.TestPlanRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsCollector {

    private static class ProjectSerializer implements JsonSerializer<Project> {
        public JsonElement serialize(Project src, Type typeOfSrc,
                                     JsonSerializationContext context) {
            return new JsonPrimitive(src.getTitle());
        }
    }

    private static class TestPlanSerializer implements JsonSerializer<TestPlan> {
        public JsonElement serialize(TestPlan src, Type typeOfSrc,
                                     JsonSerializationContext context) {
            return new JsonPrimitive(src.getTitle());
        }
    }

    private static class ScenarioSerializer implements JsonSerializer<Scenario> {
        public JsonElement serialize(Scenario src, Type typeOfSrc,
                                     JsonSerializationContext context) {
            return new JsonPrimitive(src.getTitle());
        }
    }

    private ScenarioRepository scenarioRepo;
    private ProjectRepository projectRepo;
    private TestPlanRepository testPlanRepo;
    private ConnectionRepository connectionRepo;

    public StatisticsCollector(ScenarioRepository scenarioRepo, ProjectRepository projectRepo,
                               TestPlanRepository testPlanRepo, ConnectionRepository connectionRepo) {
        this.scenarioRepo = scenarioRepo;
        this.projectRepo = projectRepo;
        this.testPlanRepo = testPlanRepo;
        this.connectionRepo = connectionRepo;
    }

    public List<ProjectStatistics> collectStatistics(){
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

    public String contructJsonString(List<ProjectStatistics> projectStatisticsList){
        //регистрируются классы для сериализации, чтоб отображать только имена объектов
        Gson gson = new GsonBuilder().setPrettyPrinting()
                .registerTypeAdapter(Project.class, new ProjectSerializer())
                .registerTypeAdapter(TestPlan.class, new TestPlanSerializer())
                .registerTypeAdapter(Scenario.class, new ScenarioSerializer())
                .create();
        String jsonStat = gson.toJson(projectStatisticsList);
        return jsonStat;
    }
}
