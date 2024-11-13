package edu.example.testingsystem.mapstruct.mapper;

import edu.example.testingsystem.entities.TestCase;
import edu.example.testingsystem.mapstruct.dto.TestCaseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TestCaseMapper {

    @Mapping(target = "projectTitle", expression = "java(testCase.getProject().getTitle())")
    @Mapping(target = "creatorId", expression = "java(testCase.getCreator().getId())")
    TestCaseDto toDto(TestCase testCase);
}
