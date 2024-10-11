package edu.example.testingsystem.repos;

import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.entities.TestPlanStat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestPlanStatRepo extends JpaRepository<TestPlanStat, Integer> {

    List<TestPlanStat> findByTestPlan(TestPlan testPlan);
}
