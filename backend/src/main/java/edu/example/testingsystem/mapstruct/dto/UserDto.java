package edu.example.testingsystem.mapstruct.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import edu.example.testingsystem.entities.Role;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserDto(Integer id,
                      String fullName,
                      String login,
                      Role role,
                      Boolean isActive) {
}
