package edu.example.testingsystem.api;

import edu.example.testingsystem.controllers.statistics.ProjectStatistics;
import edu.example.testingsystem.controllers.statistics.StatisticsCollector;
import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.repos.ProjectRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/statistics")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class StatisticsRestController {

    StatisticsCollector collector;
    ProjectRepository projectRepository;

    @GetMapping("/project/{title}")
    public ResponseEntity<Object> statisticsByProject(@PathVariable("title") String title) {
        Optional<Project> optionalProject = projectRepository.findById(title);
        if(optionalProject.isEmpty())
            return ResponseEntity.notFound().build();
        Project project = optionalProject.get();

        List<ProjectStatistics> projectStatisticsList = collector.collectStatisticsByProject(project);
        String jsonString = collector.constructJsonString(projectStatisticsList);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("text/plain"))
                .body(jsonString.getBytes());
    }

    @GetMapping()
    public ResponseEntity<Object> allStatistics() {
        List<ProjectStatistics> projectStatisticsList = collector.collectStatistics();
        String jsonString = collector.constructJsonString(projectStatisticsList);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("text/plain"))
                .body(jsonString.getBytes());
    }

    @GetMapping("/sorted")
    public ResponseEntity<List<ProjectStatistics>> projectStatOrderedByPassedAsc() {
        List<ProjectStatistics> projectStatisticsList = collector.collectStatistics();
        projectStatisticsList = projectStatisticsList.stream().sorted((first, second) -> {
            //если у кого-то впринципе нет содержимого, то считаем его наименее выполненным
            if(first.getTotal() == 0 && second.getTotal() != 0)
                return -1;
            if(first.getTotal() != 0 && second.getTotal() == 0)
                return 1;
            if(first.getTotal() == 0 && second.getTotal() == 0)
                return 0;
            //далее сравниваем процент выполнения
            Float firstCompletedPart = (float) (first.getPassed() / first.getTotal());
            Float secondCompletedPart = (float) (second.getPassed() / second.getTotal());
            return firstCompletedPart.compareTo(secondCompletedPart);
        }).toList();

        return ResponseEntity.ok(projectStatisticsList);
    }
}