package edu.example.testingsystem.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Set;

@Configuration
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {

        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());

        if (roles.contains("ROLE_ADMIN")) {
            httpServletResponse.sendRedirect("/admin");
        } else if(roles.contains("ROLE_DIRECTOR")){
            httpServletResponse.sendRedirect("/director");
        }else if(roles.contains("ROLE_ANALYST")){
            httpServletResponse.sendRedirect("/analyst");
        }else if(roles.contains("ROLE_TESTER")){
            httpServletResponse.sendRedirect("/tester");
        }else {
            httpServletResponse.sendRedirect("/");
        }
    }
}