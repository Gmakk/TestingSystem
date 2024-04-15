package edu.example.testingsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Userr {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private Integer id;
    @NotNull
    private String login;
    @NotNull
    private String password;
    @ManyToOne
    private Role role;

//    @OneToMany(mappedBy = "director")
//    private List<Project> projectDirectors;
//    @OneToMany(mappedBy = "creator")
//    private List<TestPlan> testPlanCreators;
//    @OneToMany(mappedBy = "creator")
//    private List<Scenario> scenarioCreators;
//    @OneToMany(mappedBy = "executor")
//    private List<Scenario> scenarioExecutors;
//    @OneToMany(mappedBy = "creator")
//    private List<TestCase> testCaseCreators;
}
