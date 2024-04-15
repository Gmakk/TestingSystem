package edu.example.testingsystem.repos;

import edu.example.testingsystem.entities.ScenarioCaseConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ConnectionRepository
        extends JpaRepository<ScenarioCaseConnection, Integer> {
}