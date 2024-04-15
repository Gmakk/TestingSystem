package edu.example.testingsystem.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Role {
    @Id
    @NotNull
    private String title;
    private String description;

//    @OneToMany(mappedBy = "role")
//    private List<User> users = new ArrayList<>();

    public Role(String title, String description) {
        this.title = title;
        this.description = description;
    }
}
