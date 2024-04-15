package edu.example.testingsystem.repos;

import edu.example.testingsystem.entities.TestPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TestPlanRepository
        extends JpaRepository<TestPlan, Integer> {
}