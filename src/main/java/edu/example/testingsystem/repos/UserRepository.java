package edu.example.testingsystem.repos;

import edu.example.testingsystem.entities.Userr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository
        extends JpaRepository<Userr, Integer> {
}