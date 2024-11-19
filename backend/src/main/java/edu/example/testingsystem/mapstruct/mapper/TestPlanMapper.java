package edu.example.testingsystem.mapstruct.mapper;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.TestCase;
import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.mapstruct.dto.TestCaseDto;
import edu.example.testingsystem.mapstruct.dto.TestPlanDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestPlanMapper {

    @Mapping(target = "creatorId", expression = "java(testPlan.getCreator().getId())")
    @Mapping(target = "scenarios", expression = "java(testPlan.getScenarios().stream().map(scenario -> scenario.getId()).toList())")
    @Mapping(target = "projectTitle", expression = "java(testPlan.getProject().getTitle())")
    @Mapping(target = "approved", defaultValue = "false")
    TestPlanDto toDto(TestPlan testPlan);

    default List<TestPlanDto> toDtos(List<TestPlan> testPlans){
        return testPlans.stream().map(this::toDto).toList();
    }

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "title", source = "title")
    @Mapping(target = "startDate", source = "startDate")
    @Mapping(target = "endDate", source = "endDate")
    TestPlan patchTestPlan(@MappingTarget TestPlan testPlan, TestPlanDto testPlanDto);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "title", source = "testPlanDto.title")
    @Mapping(target = "startDate", source = "testPlanDto.startDate")
    @Mapping(target = "endDate", source = "testPlanDto.endDate")
    @Mapping(target = "creator", source = "creator")
    @Mapping(target = "project", source = "project")
    TestPlan toTestPlan(TestPlanDto testPlanDto, Userr creator, Project project);

}
