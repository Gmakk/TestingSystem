package edu.example.testingsystem;

import edu.example.testingsystem.controllers.TestController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@SpringBootApplication
@EnableJpaRepositories
public class TestingSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestingSystemApplication.class, args);

    }

}
