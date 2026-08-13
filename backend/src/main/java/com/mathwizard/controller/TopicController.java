package com.mathwizard.controller;

import com.mathwizard.model.Example;
import com.mathwizard.model.Formula;
import com.mathwizard.model.Topic;
import com.mathwizard.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/topics")
@CrossOrigin(origins = "*")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public ResponseEntity<List<Topic>> getAllTopics() {
        return ResponseEntity.ok(topicService.getAllTopics());
    }

    @GetMapping("/domain/{domainName}")
    public ResponseEntity<List<Topic>> getTopicsByDomain(@PathVariable String domainName) {
        return ResponseEntity.ok(topicService.getTopicsByDomain(domainName));
    }

    @GetMapping("/{topicName}/formulas")
    public ResponseEntity<List<Formula>> getFormulas(@PathVariable String topicName) {
        return ResponseEntity.ok(topicService.getFormulasByTopic(topicName));
    }

    @GetMapping("/{topicName}/examples")
    public ResponseEntity<List<Example>> getExamples(@PathVariable String topicName) {
        return ResponseEntity.ok(topicService.getExamplesByTopic(topicName));
    }
}
