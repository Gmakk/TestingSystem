package edu.example.testingsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class TestPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Date startDate;
    private Date endDate;
    private String title;
    @ManyToOne
    private Userr creator;
    private Boolean approved;
    @ManyToMany
    @JoinTable(
            name = "test_plan_scenarios",
            joinColumns = { @JoinColumn(name = "test_plan_id") },
            inverseJoinColumns = { @JoinColumn(name = "scenario_id") }
    )
    private List<Scenario> scenarios = new ArrayList<>();

    @ManyToOne
    private Project project;
}
