package edu.example.testingsystem.mapstruct.mapper;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.mapstruct.dto.ProjectDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    @Mapping(target = "userId", expression = "java(project.getDirector().getId())")
    @Mapping(target = "testPlanIds", expression = "java(project.getTestPlans().stream().map(testPlan -> testPlan.getId()).toList())")
    ProjectDto projectToProjectDto(Project project);

}
