package edu.example.testingsystem.mapstruct.mapper;

import edu.example.testingsystem.entities.TestCase;
import edu.example.testingsystem.mapstruct.dto.TestCaseDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TestCaseMapper {

    @Mapping(target = "projectTitle", expression = "java((testCase.getProject() != null)?testCase.getProject().getTitle():null)")
    @Mapping(target = "creatorId", expression = "java((testCase.getCreator() != null)?testCase.getCreator().getId():null)")
    TestCaseDto toDto(TestCase testCase);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "inputData", source = "inputData")
    @Mapping(target = "outputData", source = "outputData")
    TestCase toTestCase(TestCaseDto testCaseDto);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "inputData", source = "inputData")
    @Mapping(target = "outputData", source = "outputData")
    TestCase patchTestCase(@MappingTarget TestCase testCase, TestCaseDto patch);
}
