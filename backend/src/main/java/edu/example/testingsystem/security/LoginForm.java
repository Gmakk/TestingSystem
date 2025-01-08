package edu.example.testingsystem.security;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Data
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginForm {
    String login;
    String password;
}
