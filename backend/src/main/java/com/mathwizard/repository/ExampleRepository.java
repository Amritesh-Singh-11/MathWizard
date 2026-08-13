package com.mathwizard.repository;

import com.mathwizard.model.Example;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ExampleRepository extends MongoRepository<Example, String> {
    List<Example> findByTopicName(String topicName);
}
