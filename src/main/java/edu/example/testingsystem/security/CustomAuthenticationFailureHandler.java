package edu.example.testingsystem.security;

import edu.example.testingsystem.entities.Userr;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;

@Configuration
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(final HttpServletRequest request, final HttpServletResponse response, final AuthenticationException exception) throws IOException, ServletException {
        System.out.println(exception.getMessage());

        if(exception.getMessage().equals("User is disabled")) {
            response.sendRedirect("/inactive");
        }else
            response.sendRedirect("/login");
            //response.sendError(HttpServletResponse.SC_UNAUTHORIZED, exception.getMessage());
    }
}
