package edu.example.testingsystem.repos;

import edu.example.testingsystem.entities.Role;
import edu.example.testingsystem.entities.Userr;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository
        extends JpaRepository<Userr, Integer> {

    Optional<Userr> findByLogin(String login);

    List<Userr> findByRole(Role role);

    Page<Userr> findAllByRole(Role role, Pageable pageable);

    @Transactional
    void deleteByIsActive(Boolean isActive);

    @Transactional
    void deleteByRole(Role role);
}