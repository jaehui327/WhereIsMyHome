package com.ssafy.happyhouse.answer.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.answer.model.AnswerDto;

public interface AnswerService {

	List<AnswerDto> selectAllAnswerByQuestionNo(int questionNo) throws SQLException;
	void insertAnswer(Map<String, Object> map) throws SQLException;
	void updateAnswer(Map<String, Object> map) throws SQLException;
	void deleteAnswer(int answerNo) throws SQLException;
	void addLike(int answerNo) throws SQLException;
	void subLike(int answerNo) throws SQLException;
	int selectLikeByAnswerNo(int answerNo) throws SQLException;
	
}
