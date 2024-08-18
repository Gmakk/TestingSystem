package edu.example.testingsystem.messaging;

import edu.example.testingsystem.entities.Test;
import edu.example.testingsystem.entities.TestCase;
import jakarta.jms.Destination;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class TestMessagingService {
    private JmsTemplate jmsTemplate;
    private Destination destination;

    public TestMessagingService(JmsTemplate jmsTemplate, Destination destination) {
        this.jmsTemplate = jmsTemplate;
        this.destination = destination;
    }

    public void sendTest(Test test) {
        jmsTemplate.convertAndSend(destination, test, message -> {
            message.setStringProperty("X_TESTCASE_SOURCE", "WEB");
            return message;
        });
    }
}