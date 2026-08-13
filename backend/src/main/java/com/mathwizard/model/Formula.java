package com.mathwizard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "formulas")
public class Formula {
    @Id
    private String id;
    private String topicName;
    private String formulaName;
    private String expression;
    private String explanation;

    public Formula() {
    }

    public Formula(String id, String topicName, String formulaName, String expression, String explanation) {
        this.id = id;
        this.topicName = topicName;
        this.formulaName = formulaName;
        this.expression = expression;
        this.explanation = explanation;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getFormulaName() {
        return formulaName;
    }

    public void setFormulaName(String formulaName) {
        this.formulaName = formulaName;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
}
