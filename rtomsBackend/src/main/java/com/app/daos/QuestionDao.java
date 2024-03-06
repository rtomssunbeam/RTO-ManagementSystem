package com.app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.*;

@Repository
public interface QuestionDao extends JpaRepository<Question,Integer> {
	
//	@Query(value = "SELECT * FROM questions WHERE RAND() <= 0.2 ORDER BY RAND()", nativeQuery = true)
//	List<Question> find20RandomQuestions();
	
    @Query(value = "SELECT * FROM questions ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Question> find20RandomQuestions();


}
