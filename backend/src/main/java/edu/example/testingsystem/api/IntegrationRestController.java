package edu.example.testingsystem.api;

import edu.example.testingsystem.ai.AiGenerationService;
import edu.example.testingsystem.ai.DescriptionGenerationRequest;
import edu.example.testingsystem.ai.DescriptionGenerationResponse;
import edu.example.testingsystem.mapstruct.dto.GenerationRequest;
import edu.example.testingsystem.mapstruct.dto.GenerationResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.Random;

@RestController
@RequestMapping("/api/integration")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class IntegrationRestController {
    AiGenerationService aiGenerationService;

    @PostMapping("/generate")
    public ResponseEntity<GenerationResponse> generateDescriptionByTitle(@RequestBody GenerationRequest title) {
        DescriptionGenerationResponse result = aiGenerationService.generateDescription(title.title());

        return ResponseEntity.ok(new GenerationResponse(result.response()));
    }
}
