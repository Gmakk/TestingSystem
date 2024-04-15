package edu.example.testingsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Project {
    @Id
    @NotNull
    private String title;
    @ManyToOne
    private Userr director;
    private String requir;//требования
//    @OneToMany(mappedBy = "project")
//    private List<TestPlan> testPlans = new ArrayList<>();
//    @OneToMany(mappedBy = "project")
//    private List<TestCase> testCases = new ArrayList<>();

}
