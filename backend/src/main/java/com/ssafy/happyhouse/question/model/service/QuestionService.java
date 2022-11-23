package com.ssafy.happyhouse.question.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.question.model.QuestionDto;
import com.ssafy.happyhouse.question.model.SearchDto;

public interface QuestionService {

	Map<String, Object> selectAllQuestion(SearchDto searchDto) throws SQLException;
	QuestionDto selectByNo(int no) throws SQLException;
	void insertQuestion(Map<String, Object> map) throws SQLException;
	void updateQuestion(Map<String, Object> map) throws SQLException;
	void updateHit(int no) throws SQLException;
	void deleteQuestion(int no) throws SQLException;

}
