package edu.example.testingsystem.repos;

import edu.example.testingsystem.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository
        extends JpaRepository<Role, String> {
}