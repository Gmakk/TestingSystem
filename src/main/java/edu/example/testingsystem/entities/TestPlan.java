package edu.example.testingsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class TestPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private Integer id;
    private Date startDate;
    private Date endDate;
    @ManyToOne
    private Userr creator;
    private Boolean approved;
    @ManyToMany
    private List<Scenario> scenarios = new ArrayList<>();

    @ManyToOne
    private Project project;
}
