package edu.example.testingsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Scenario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private Integer id;
    @ManyToOne
    private Userr creator;
    @ManyToOne
    private Userr executor;
    @ManyToMany(mappedBy = "scenarios")
    private List<TestPlan> testPlans = new ArrayList<>();
//    @OneToMany(mappedBy = "scenario")
//    private List<ScenarioCaseConnection> connections = new ArrayList<>();
}
