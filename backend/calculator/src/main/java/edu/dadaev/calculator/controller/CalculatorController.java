package edu.dadaev.calculator.controller;

import edu.dadaev.calculator.dto.CalculateRequestDTO;
import edu.dadaev.calculator.dto.CalculateResponseDTO;
import edu.dadaev.calculator.service.CalculatorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequiredArgsConstructor
@RequestMapping("/api/calculate")
public class CalculatorController {
    private final CalculatorService calculatorService;

    @PostMapping
    public ResponseEntity<CalculateResponseDTO> calculate(@Valid @RequestBody CalculateRequestDTO requestDTO){
        CalculateResponseDTO response = calculatorService.calculate(requestDTO);

        return ResponseEntity
                .ok()
                .body(response);
    }
}
