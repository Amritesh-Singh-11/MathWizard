package com.mathwizard.repository;

import com.mathwizard.model.Formula;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FormulaRepository extends MongoRepository<Formula, String> {
    List<Formula> findByTopicName(String topicName);
}
