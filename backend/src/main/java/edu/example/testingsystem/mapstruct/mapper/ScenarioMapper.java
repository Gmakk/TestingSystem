package edu.example.testingsystem.mapstruct.mapper;

import edu.example.testingsystem.entities.Scenario;
import edu.example.testingsystem.mapstruct.dto.ScenarioDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ScenarioMapper {

    @Mapping(target = "creator", expression = "java(scenario.getCreator().getId())")
    @Mapping(target = "executor", expression = "java(scenario.getExecutor().getId())")
    @Mapping(target = "testPlans", expression = "java(scenario.getTestPlans().stream().map(testPlan -> testPlan.getId()).toList())")
    @Mapping(target = "projectTitle", expression = "java(scenario.getProject().getTitle())")
    ScenarioDto toDto(Scenario scenario);

    default List<ScenarioDto> toDtos(List<Scenario> scenarios){
        return scenarios.stream().map(this::toDto).toList();
    }

}
