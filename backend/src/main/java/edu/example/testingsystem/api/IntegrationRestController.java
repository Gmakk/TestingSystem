package edu.example.testingsystem.api;

import edu.example.testingsystem.mapstruct.dto.GenerationRequest;
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

    @PostMapping("/generate")
    public ResponseEntity<String> generateDescriptionByTitle(@RequestBody GenerationRequest title) {
        byte[] array = new byte[20]; // length is bounded by 7
        new Random().nextBytes(array);
        String generatedString = new String(array, Charset.forName("UTF-16"));

        return ResponseEntity.ok(generatedString);
    }
}
