package com.mathwizard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "topics")
public class Topic {
    @Id
    private String id;
    private String domainName;
    private String topicName;
    private String description;
    private String inputType;
    private List<String> supportedOperations;

    public Topic() {
    }

    public Topic(String id, String domainName, String topicName, String description, String inputType, List<String> supportedOperations) {
        this.id = id;
        this.domainName = domainName;
        this.topicName = topicName;
        this.description = description;
        this.inputType = inputType;
        this.supportedOperations = supportedOperations;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInputType() {
        return inputType;
    }

    public void setInputType(String inputType) {
        this.inputType = inputType;
    }

    public List<String> getSupportedOperations() {
        return supportedOperations;
    }

    public void setSupportedOperations(List<String> supportedOperations) {
        this.supportedOperations = supportedOperations;
    }
}
