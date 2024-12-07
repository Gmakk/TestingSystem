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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserRestController {
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
    public ResponseEntity<UserDto> getUser(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(userMapper.userToUserDto(userRepository.findById(id).get()));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserDto> updateActiveUserStatus(@PathVariable("id") Integer id, @RequestBody UserDto userDto) {
        Userr user =userRepository.findById(id).get();
        user.setIsActive(userDto.isActive());
        return ResponseEntity.ok(userMapper.userToUserDto(userRepository.save(user)));
    }

    @PatchMapping("/{id}/role")
    public ResponseEntity<UserDto> updateRole(@PathVariable("id") Integer id, @RequestBody UserDto userDto) {
        Userr user =userRepository.findById(id).get();
        user.setRole(roleRepository.findById(userDto.role()).get());
        return ResponseEntity.ok(userMapper.userToUserDto(userRepository.save(user)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Integer id) {
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

    @GetMapping("/pagination")
    public Page<UserDto> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String role){


        //если указана роль, проверяем, есть ли такая
        Role roleEntity = null;
        if(role != null && !role.isEmpty()){
            Optional<Role> optionalRole = roleRepository.findById(role);
            if(optionalRole.isEmpty())
                throw new NoSuchElementException("Attempt to retrieve user with non-existing role " + role);
            roleEntity = optionalRole.get();
        }

        Pageable pagable;
        Page<Userr> pageWitUser;
        if(sort != null && !sort.isEmpty()) {
            //есть сортировка по полю и фильтрация по роли
            if(role != null && !role.isEmpty()){
                pagable = PageRequest.of(page, size, Sort.by(sort));
                pageWitUser = userRepository.findAllByRole(roleEntity, pagable);
            }else {//есть сортировка по полю и нет фильтрации по роли
                pagable = PageRequest.of(page, size, Sort.by(sort));
                pageWitUser = userRepository.findAll(pagable);
            }
        }else {
            //нет сортировки по полю и есть фильтрация по роли
            if(role != null && !role.isEmpty()){
                pagable = PageRequest.of(page, size);
                pageWitUser = userRepository.findAllByRole(roleEntity, pagable);
            }else {//нет сортировки по полю и фильтрации по роли
                pagable = PageRequest.of(page, size);
                pageWitUser = userRepository.findAll(pagable);
            }
        }

        return pageWitUser.map(userMapper::userToUserDto);
    }
}