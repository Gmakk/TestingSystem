package edu.example.testingsystem.mapstruct.mapper;

import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.mapstruct.dto.TestPlanDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TestPlanMapper {

    @Mapping(target = "creatorId", expression = "java(testPlan.getCreator().getId())")
    @Mapping(target = "scenarios", expression = "java(testPlan.getScenarios().stream().map(scenario -> scenario.getId()).toList())")
    @Mapping(target = "projectTitle", expression = "java(testPlan.getProject().getTitle())")
    TestPlanDto toDto(TestPlan testPlan);

}
