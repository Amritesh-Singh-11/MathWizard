package com.mathwizard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;

@Document(collection = "examples")
public class Example {
    @Id
    private String id;
    private String topicName;
    private String title;
    private String exampleInput;
    private String expectedOutput;
    private Map<String, Object> params;

    public Example() {
    }

    public Example(String id, String topicName, String title, String exampleInput, String expectedOutput, Map<String, Object> params) {
        this.id = id;
        this.topicName = topicName;
        this.title = title;
        this.exampleInput = exampleInput;
        this.expectedOutput = expectedOutput;
        this.params = params;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExampleInput() {
        return exampleInput;
    }

    public void setExampleInput(String exampleInput) {
        this.exampleInput = exampleInput;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public Map<String, Object> getParams() {
        return params;
    }

    public void setParams(Map<String, Object> params) {
        this.params = params;
    }
}
