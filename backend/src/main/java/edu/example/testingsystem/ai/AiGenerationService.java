package edu.example.testingsystem.ai;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AiGenerationService {
    RestTemplate restTemplate;
    static String URL = "http://localhost:9092/api/v1/ai/";

    public DescriptionGenerationResponse generateDescription(String requestString){
        DescriptionGenerationRequest request = new DescriptionGenerationRequest(requestString);
        return restTemplate.postForObject(URL, request, DescriptionGenerationResponse.class);
    }

}
