package edu.example.testingsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class TestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private Integer id;
    @ManyToOne
    private Project project;
    @ManyToOne
    private Userr creator;
    @NotNull
    private String description;
    @NotNull
    private String inputData;
    @NotNull
    private String outputData;
//    @OneToMany(mappedBy = "testCase")
//    private List<ScenarioCaseConnection> connections = new ArrayList<>();
}
