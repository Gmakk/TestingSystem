package edu.example.testingsystem.security;

import edu.example.testingsystem.entities.Role;
import edu.example.testingsystem.entities.Userr;
import edu.example.testingsystem.repos.RoleRepository;
import edu.example.testingsystem.repos.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

import edu.example.testingsystem.security.WorkWithData;
import org.springframework.stereotype.Service;

import static edu.example.testingsystem.security.WorkWithData.findUsersRole;

@Data
@Service
public class RegistrationForm {
    private String username;
    private String password;
    //private String role;



//    public RegistrationForm(String username, String password, String role) {
//        this.username = username;
//        this.password = password;
//        this.role = role;
//    }

    public Userr toUser(PasswordEncoder passwordEncoder) {
        //Optional<Role> usersRole = findUsersRole(role);
        //Optional<Role> usersRole = roleRepo.findById(role);
        //if(usersRole.isEmpty())
            //throw new RuntimeException("Role not found");
        return new Userr(username, passwordEncoder.encode(password), null);
    }
}