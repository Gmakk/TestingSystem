package edu.example.testingsystem.repos;

import edu.example.testingsystem.entities.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ScenarioRepository
        extends JpaRepository<Scenario, Integer> {
}