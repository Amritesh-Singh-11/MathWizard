package com.mathwizard.model;

import java.util.Map;

public class CalculationRequest {
    private String domain;
    private String topic;
    private String expression;
    private Map<String, Object> params;

    public CalculationRequest() {
    }

    public CalculationRequest(String domain, String topic, String expression, Map<String, Object> params) {
        this.domain = domain;
        this.topic = topic;
        this.expression = expression;
        this.params = params;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public Map<String, Object> getParams() {
        return params;
    }

    public void setParams(Map<String, Object> params) {
        this.params = params;
    }
}
