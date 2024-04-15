package edu.example.testingsystem.repos;

import edu.example.testingsystem.entities.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TestCaseRepository
        extends JpaRepository<TestCase, Integer> {
}