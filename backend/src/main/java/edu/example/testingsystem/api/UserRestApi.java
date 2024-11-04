package edu.example.testingsystem.api;

import edu.example.testingsystem.entities.Role;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.mapstruct.dto.UserDto;
import edu.example.testingsystem.mapstruct.mapper.UserMapper;
import edu.example.testingsystem.repos.RoleRepository;
import edu.example.testingsystem.repos.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/user")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserRestApi {
    RoleRepository roleRepository;
    UserRepository userRepository;
    UserMapper userMapper;

    @GetMapping("/testers")
    public ResponseEntity<List<UserDto>> getTesters() {
        Role role = roleRepository.findById("tester").get();
        return ResponseEntity.ok(userMapper.usersToUserDtos(userRepository.findByRole(role)));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userMapper.usersToUserDtos(userRepository.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id) {
        return ResponseEntity.ok(userMapper.userToUserDto(userRepository.findById(id).get()));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserDto> updateActiveUserStatus(@PathVariable Integer id, @RequestBody UserDto userDto) {
        Userr user =userRepository.findById(id).get();
        user.setIsActive(userDto.isActive());
        return ResponseEntity.ok(userMapper.userToUserDto(userRepository.save(user)));
    }

    @PatchMapping("/{id}/role")
    public ResponseEntity<UserDto> updateRole(@PathVariable Integer id, @RequestBody UserDto userDto) {
        Userr user =userRepository.findById(id).get();
        user.setRole(roleRepository.findById(userDto.role()).get());
        return ResponseEntity.ok(userMapper.userToUserDto(userRepository.save(user)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Integer id) {
        if(!userRepository.existsById(id))
            throw new NoSuchElementException("Attempt to delete user with non-existing id " + id);
        userRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        Userr newUser =userRepository.save(new Userr(userDto.login(),userDto.password()));
        return ResponseEntity.ok(userMapper.userToUserDto(newUser));
    }
}
