package com.mathwizard.service;

import com.mathwizard.model.CalculationRequest;
import com.mathwizard.model.CalculationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class CalculationService {

    private final RestTemplate restTemplate;

    @Value("${math.engine.url:http://localhost:8000}")
    private String mathEngineUrl;

    public CalculationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public CalculationResponse solve(CalculationRequest request) {
        String url = mathEngineUrl + "/solve";
        try {
            ResponseEntity<CalculationResponse> response = restTemplate.postForEntity(url, request, CalculationResponse.class);
            if (response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception e) {
            return createErrorResponse(request, "Math Engine Error: " + e.getMessage());
        }
        return createErrorResponse(request, "Empty response from Math Engine microservice");
    }

    private CalculationResponse createErrorResponse(CalculationRequest request, String errorMsg) {
        CalculationResponse errorRes = new CalculationResponse();
        errorRes.setAnswer("Calculation Failed: " + errorMsg);
        errorRes.setLatexAnswer("\\text{Calculation Failed: " + errorMsg + "}");
        errorRes.setSteps(Arrays.asList(
            "Target Topic: " + request.getTopic(),
            "Error Details: " + errorMsg,
            "Suggestion: Please verify input expression syntax and parameter bounds."
        ));
        Map<String, Object> viz = new HashMap<>();
        viz.put("type", "NONE");
        errorRes.setVisualizationData(viz);
        return errorRes;
    }
}
