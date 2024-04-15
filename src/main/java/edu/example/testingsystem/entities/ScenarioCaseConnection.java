package edu.example.testingsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class ScenarioCaseConnection {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private Integer id;
    private String comment;
    private Boolean passed;

    @ManyToOne
    private Scenario scenario;
    @ManyToOne
    private TestCase testCase;

}
