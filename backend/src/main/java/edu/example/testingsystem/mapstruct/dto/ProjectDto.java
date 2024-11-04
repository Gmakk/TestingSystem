package edu.example.testingsystem.mapstruct.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ProjectDto(String title,
                         Integer userId,
                         List<Integer> testPlanIds) {
}
