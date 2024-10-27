package edu.example.testingsystem.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Userr implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NotNull
    private Integer id;
    private String fullName;
    @NotNull
    private String login;
    @NotNull
    private String password;
    @ManyToOne
    private Role role;
    private Boolean isActive;

    public Userr(String login, String password) {
        this.login = login;
        this.password = password;
        this.role = null;
        this.isActive = false;
    }

    public void assignRoleAndMakeActive(Role role) {
        this.role = role;
        this.isActive = true;
    }

    /**
     * Добавляет в список все привилегии, связанные с ролью пользователя
     * @return список всех привилегий пользователя
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (role == null)
            return authorities;
        for(Authority authority : role.getAuthorities()) {
            authorities.add(new SimpleGrantedAuthority(authority.getName()));
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }

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
