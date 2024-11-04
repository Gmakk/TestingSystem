package edu.example.testingsystem.mapstruct.mapper;

import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.mapstruct.dto.UserDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto userToUserDto(Userr user);

    default List<UserDto> usersToUserDtos(List<Userr> users){
        return users.stream().map(this::userToUserDto).toList();
    };
}
