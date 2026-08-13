package com.mathwizard.repository;

import com.mathwizard.model.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TopicRepository extends MongoRepository<Topic, String> {
    List<Topic> findByDomainName(String domainName);
    Topic findByTopicName(String topicName);
}
