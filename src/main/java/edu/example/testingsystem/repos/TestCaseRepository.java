package edu.example.testingsystem.repos;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TestCaseRepository
        extends JpaRepository<TestCase, Integer> {

    List<TestCase> findByProject(Project project);
}