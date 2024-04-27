package edu.example.testingsystem.security;

import edu.example.testingsystem.entities.Role;
import edu.example.testingsystem.repos.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkWithData {
    private static RoleRepository roleRepo;

    private WorkWithData(RoleRepository roleRepo) {
        WorkWithData.roleRepo = roleRepo;
    }

    public static Optional<Role> findUsersRole(String role) {
        return roleRepo.findById(role);
    }

}
