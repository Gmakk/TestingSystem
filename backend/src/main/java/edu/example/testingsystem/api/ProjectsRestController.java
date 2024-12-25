package edu.example.testingsystem.api;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.mapstruct.dto.ProjectDto;
import edu.example.testingsystem.mapstruct.mapper.ProjectMapper;
import edu.example.testingsystem.repos.ProjectRepository;
import edu.example.testingsystem.repos.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProjectsRestController {
    ProjectRepository projectRepository;
    UserRepository userRepository;
    ProjectMapper projectMapper;

    @GetMapping("/all")
    public List<String> getAllProjects() {
        List<String> test = projectRepository.findAll().stream().map(Project::getTitle).toList();
        return test;
    }

    @GetMapping("/{title}")
    public ProjectDto getProjectById(@PathVariable("title") String title) {
        return projectMapper.projectToProjectDto(projectRepository.findById(title).get());
    }

    @PostMapping
    public ProjectDto setProjectDirector(@RequestBody ProjectDto projectDto) {
        Project found = projectRepository.findById(projectDto.title()).get();
        found.setDirector(userRepository.findById(projectDto.director()).get());
        return projectMapper.projectToProjectDto(projectRepository.save(found));
    }
}
