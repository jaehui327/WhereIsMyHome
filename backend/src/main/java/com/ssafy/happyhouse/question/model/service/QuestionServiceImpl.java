package com.ssafy.happyhouse.question.model.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.question.model.QuestionDto;
import com.ssafy.happyhouse.question.model.SearchDto;
import com.ssafy.happyhouse.question.model.mapper.QuestionMapper;

@Service
public class QuestionServiceImpl implements QuestionService {
	
	@Autowired
	private QuestionMapper mapper;

	@Override
	public Map<String, Object> selectAllQuestion(SearchDto searchDto) throws SQLException {
		Map<String, Object> map = new HashMap<String, Object>();

		int start = searchDto.getPg() == 0 ? 0 : (searchDto.getPg() - 1) * searchDto.getSpp();
		searchDto.setStart(start);
		List<QuestionDto> questions = mapper.selectAllQuestion(searchDto);
		map.put("questions", questions);
		
		int totalCnt = mapper.getTotalCnt(searchDto);
		map.put("totalCnt", totalCnt);
		
		return map;
	}

	@Override
	public QuestionDto selectByNo(int no) throws SQLException {
		return mapper.selectByNo(no);
	}

	@Override
	public void insertQuestion(Map<String, Object> map) throws SQLException {
		mapper.insertQuestion(map);
	}

	@Override
	public void updateQuestion(Map<String, Object> map) throws SQLException {
		mapper.updateQuestion(map);
	}

	@Override
	public void updateHit(int no) throws SQLException {
		mapper.updateHit(no);
	}

	@Override
	public void deleteQuestion(int no) throws SQLException {
		mapper.deleteQuestion(no);
	}

}
