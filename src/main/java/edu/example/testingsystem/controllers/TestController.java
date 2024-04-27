//package edu.example.testingsystem.controllers;
//
//import edu.example.testingsystem.repos.AuthorityRepository;
//import edu.example.testingsystem.repos.RoleRepository;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//
//@Controller
//public class TestController {
//
//    private RoleRepository roleRepository;
//    private AuthorityRepository authorityRepository;
//
//
//    public TestController(RoleRepository roleRep, AuthorityRepository authorityRep){
//        roleRepository = roleRep;
//        authorityRepository = authorityRep;
//    }
//
//    @GetMapping("/")
//    public String doSmt(){
////        //создаем привилегии
////        authorityRepository.save(new Authority("ROLE_ADMIN"));
////        authorityRepository.save(new Authority("ROLE_ANALYST"));
////        authorityRepository.save(new Authority("ROLE_TESTER"));
////        authorityRepository.save(new Authority("ROLE_DIRECTOR"));
////
////
////        //администратор
////        List<Authority> adminAuthorities = new ArrayList<>();
////        adminAuthorities.add(authorityRepository.findById("ROLE_ADMIN").get());
////        roleRepository.save(new Role("admin","Rules everything",adminAuthorities));
////
////        //тест-аналитик
////        List<Authority> analystAuthorities = new ArrayList<>();
////        analystAuthorities.add(authorityRepository.findById("ROLE_ANALYST").get());
////        roleRepository.save(new Role("analyst","Creates test cases",analystAuthorities));
////
////        //тестировщик
////        List<Authority> testerAuthorities = new ArrayList<>();
////        testerAuthorities.add(authorityRepository.findById("ROLE_TESTER").get());
////        roleRepository.save(new Role("tester","Performs test cases",testerAuthorities));
////
////        //руководитель тестирования
////        List<Authority> directorAuthorities = new ArrayList<>();
////        directorAuthorities.add(authorityRepository.findById("ROLE_DIRECTOR").get());
////        roleRepository.save(new Role("director","Approves the plan",directorAuthorities));
//
//        return "homeAdmin";
//    }
//}
