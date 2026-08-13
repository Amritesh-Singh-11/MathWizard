package com.mathwizard.service;

import com.mathwizard.model.Example;
import com.mathwizard.model.Formula;
import com.mathwizard.model.Topic;
import com.mathwizard.repository.ExampleRepository;
import com.mathwizard.repository.FormulaRepository;
import com.mathwizard.repository.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final FormulaRepository formulaRepository;
    private final ExampleRepository exampleRepository;

    public TopicService(TopicRepository topicRepository, FormulaRepository formulaRepository, ExampleRepository exampleRepository) {
        this.topicRepository = topicRepository;
        this.formulaRepository = formulaRepository;
        this.exampleRepository = exampleRepository;
    }

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public List<Topic> getTopicsByDomain(String domainName) {
        return topicRepository.findByDomainName(domainName);
    }

    public List<Formula> getFormulasByTopic(String topicName) {
        return formulaRepository.findByTopicName(topicName);
    }

    public List<Example> getExamplesByTopic(String topicName) {
        return exampleRepository.findByTopicName(topicName);
    }
}
