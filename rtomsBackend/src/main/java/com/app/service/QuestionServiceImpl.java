package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.daos.QuestionDao;
import com.app.entities.Question;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionDao questionDao;

	@Override
	public List<Question> get20RandomQuestions() {
		
		return questionDao.find20RandomQuestions();
	}
}
