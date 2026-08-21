package com.mathwizard.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;

public class CalculationResponse {
    private String answer;
    private String latexAnswer;
    private List<String> steps;

    @JsonProperty("visualizationData")
    @JsonAlias({"visualization", "visualizationData"})
    private Map<String, Object> visualizationData;

    public CalculationResponse() {
    }

    public CalculationResponse(String answer, String latexAnswer, List<String> steps, Map<String, Object> visualizationData) {
        this.answer = answer;
        this.latexAnswer = latexAnswer;
        this.steps = steps;
        this.visualizationData = visualizationData;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getLatexAnswer() {
        return latexAnswer;
    }

    public void setLatexAnswer(String latexAnswer) {
        this.latexAnswer = latexAnswer;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    public Map<String, Object> getVisualizationData() {
        return visualizationData;
    }

    public void setVisualizationData(Map<String, Object> visualizationData) {
        this.visualizationData = visualizationData;
    }

    public Map<String, Object> getVisualization() {
        return visualizationData;
    }

    public void setVisualization(Map<String, Object> visualization) {
        this.visualizationData = visualization;
    }
}

