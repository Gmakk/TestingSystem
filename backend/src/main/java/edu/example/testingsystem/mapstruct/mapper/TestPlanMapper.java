package edu.example.testingsystem.mapstruct.mapper;

import edu.example.testingsystem.entities.*;
import edu.example.testingsystem.mapstruct.dto.TestCaseDto;
import edu.example.testingsystem.mapstruct.dto.TestPlanDto;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestPlanMapper {

    @Mapping(target = "creatorId", source = "testPlan.creator.id",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "scenarios", expression = "java(testPlan.getScenarios().stream().map(scenario -> scenario.getId()).toList())")
    @Mapping(target = "projectTitle", expression = "java(testPlan.getProject().getTitle())")
    @Mapping(target = "approved", defaultValue = "false")
    TestPlanDto toDto(TestPlan testPlan);

    default List<TestPlanDto> toDtos(List<TestPlan> testPlans){
        return testPlans.stream().map(this::toDto).toList();
    }

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "title", source = "testPlanDto.title")
    @Mapping(target = "startDate", source = "testPlanDto.startDate")
    @Mapping(target = "endDate", source = "testPlanDto.endDate")
    @Mapping(target = "project", source = "project")
    TestPlan patchTestPlan(@MappingTarget TestPlan testPlan, TestPlanDto testPlanDto, Project project);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "title", source = "testPlanDto.title")
    @Mapping(target = "startDate", source = "testPlanDto.startDate")
    @Mapping(target = "endDate", source = "testPlanDto.endDate")
    @Mapping(target = "project", source = "project")
    @Mapping(target = "approved", defaultValue = "false")
    TestPlan toTestPlan(TestPlanDto testPlanDto, Project project);

}
