package edu.example.testingsystem.entities;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class TestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private Integer id;
    private String title;
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
