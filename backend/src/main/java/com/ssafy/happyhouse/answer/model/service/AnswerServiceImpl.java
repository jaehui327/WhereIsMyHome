package com.ssafy.happyhouse.answer.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.answer.model.AnswerDto;
import com.ssafy.happyhouse.answer.model.mapper.AnswerMapper;

@Service
public class AnswerServiceImpl implements AnswerService {

	@Autowired
	private AnswerMapper mapper;
	
	@Override
	public List<AnswerDto> selectAllAnswerByQuestionNo(int questionNo) throws SQLException {
		return mapper.selectAllAnswerByQuestionNo(questionNo);
	}

	@Override
	public void insertAnswer(Map<String, Object> map) throws SQLException {
		mapper.insertAnswer(map);
	}

	@Override
	public void updateAnswer(Map<String, Object> map) throws SQLException {
		mapper.updateAnswer(map);
	}

	@Override
	public void deleteAnswer(int answerNo) throws SQLException {
		mapper.deleteAnswer(answerNo);
	}

	@Override
	public void addLike(int answerNo) throws SQLException {
		mapper.addLike(answerNo);
	}

	@Override
	public void subLike(int answerNo) throws SQLException {
		mapper.subLike(answerNo);
	}

	@Override
	public int selectLikeByAnswerNo(int answerNo) throws SQLException {
		return mapper.selectLikeByAnswerNo(answerNo);
	}

}
