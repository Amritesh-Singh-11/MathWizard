package com.mathwizard.controller;

import com.mathwizard.model.CalculationRequest;
import com.mathwizard.model.CalculationResponse;
import com.mathwizard.service.CalculationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/calculate")
@CrossOrigin(origins = "*")
public class CalculationController {

    private final CalculationService calculationService;

    public CalculationController(CalculationService calculationService) {
        this.calculationService = calculationService;
    }

    @PostMapping
    public ResponseEntity<CalculationResponse> calculate(@RequestBody CalculationRequest request) {
        CalculationResponse response = calculationService.solve(request);
        return ResponseEntity.ok(response);
    }
}
