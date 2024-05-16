package edu.example.testingsystem.controllers.tester;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tester")
public class TesterController {

    @GetMapping
    public String showTesterPage() {
        return "tester";
    }
}
