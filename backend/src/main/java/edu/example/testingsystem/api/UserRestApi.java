package edu.example.testingsystem.api;

import edu.example.testingsystem.entities.Role;
import edu.example.testingsystem.mapstruct.dto.UserDto;
import edu.example.testingsystem.mapstruct.mapper.UserMapper;
import edu.example.testingsystem.repos.RoleRepository;
import edu.example.testingsystem.repos.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserRestApi {
    RoleRepository roleRepository;
    UserRepository userRepository;
    UserMapper userMapper;

    @GetMapping("/testers")
    public ResponseEntity<List<UserDto>> testers() {
        Role role = roleRepository.findById("tester").get();
        return ResponseEntity.ok(userMapper.usersToUserDtos(userRepository.findByRole(role)));
    }
}
