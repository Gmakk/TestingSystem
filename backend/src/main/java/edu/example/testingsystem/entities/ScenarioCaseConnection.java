package edu.example.testingsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ScenarioCaseConnection {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private Integer id;
    private String comment;
    private Boolean executed;
    private Boolean passed;

    @ManyToOne
    private Scenario scenario;
    @ManyToOne
    private TestCase testCase;

    @ManyToOne
    private TestPlan testPlan;

}
