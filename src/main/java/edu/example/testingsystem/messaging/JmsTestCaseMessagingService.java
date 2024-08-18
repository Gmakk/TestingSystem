package edu.example.testingsystem.messaging;

import edu.example.testingsystem.entities.TestCase;
import jakarta.jms.Destination;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.Session;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.jms.core.MessagePostProcessor;
import org.springframework.stereotype.Service;

@Service
public class JmsTestCaseMessagingService implements TestCaseMessagingService {
    private JmsTemplate jmsTemplate;
    private Destination destination;

    public JmsTestCaseMessagingService(JmsTemplate jmsTemplate, Destination destination) {
        this.jmsTemplate = jmsTemplate;
        this.destination = destination;
    }

    @Override
    public void sendTestCase(TestCase testCase) {
        jmsTemplate.convertAndSend(destination, testCase, message -> {
            message.setStringProperty("X_TESTCASE_SOURCE", "WEB");
            return message;
        });
    }
}
