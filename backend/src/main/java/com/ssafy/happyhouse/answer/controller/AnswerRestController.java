package com.ssafy.happyhouse.answer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.answer.model.AnswerDto;
import com.ssafy.happyhouse.answer.model.service.AnswerService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/answer")
@CrossOrigin(originPatterns = "http://localhost:8000")
@Api("AnswernRestConroller API V1")
public class AnswerRestController {
	
	private static final Logger logger = LoggerFactory.getLogger(AnswerRestController.class);
	
	@Autowired
	AnswerService service;
	
	@GetMapping("/{questionNo}")
	private ResponseEntity<?> selectAllAnswerByQuestionNo(@PathVariable int questionNo) {
		try {
			logger.debug("selectAllAnswerByQuestionNo - {}", service.selectAllAnswerByQuestionNo(questionNo));
			List<AnswerDto> answers = service.selectAllAnswerByQuestionNo(questionNo);
			if (answers != null && !answers.isEmpty()) {
				return new ResponseEntity<List<AnswerDto>>(answers, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		}catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@Transactional
	@PostMapping()
	private ResponseEntity<?> insertAnswer(@RequestBody Map<String, Object> map) {
		try {
			service.insertAnswer(map);
			return new ResponseEntity<List<AnswerDto>>(service.selectAllAnswerByQuestionNo((int) map.get("questionNo")), HttpStatus.CREATED);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@Transactional
	@PutMapping("/{questionNo}/{answerNo}")
	private ResponseEntity<?> updateAnswer(@PathVariable int questionNo, @PathVariable int answerNo, @RequestBody Map<String, Object> map) {
		try {
			map.put("answerNo", answerNo);
			service.updateAnswer(map);
			return new ResponseEntity<List<AnswerDto>>(service.selectAllAnswerByQuestionNo(questionNo), HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@Transactional
	@DeleteMapping("/{questionNo}/{answerNo}") 
	private ResponseEntity<?> deleteAnswer(@PathVariable int questionNo, @PathVariable int answerNo) {
		try {
			service.deleteAnswer(answerNo);
			List<AnswerDto> answers = service.selectAllAnswerByQuestionNo(questionNo);
			if (answers != null && !answers.isEmpty()) {
				return new ResponseEntity<List<AnswerDto>>(answers, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@Transactional
	@PutMapping("/like/up/{answerNo}")
	private ResponseEntity<?> addLike(@PathVariable int answerNo) {
		try {
			service.addLike(answerNo);
			Map<String, Integer> map = new HashMap<String, Integer>();
			map.put("like", service.selectLikeByAnswerNo(answerNo));
			return new ResponseEntity<Map<String, Integer>>(map, HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@Transactional
	@PutMapping("/like/down/{answerNo}")
	private ResponseEntity<?> subLike(@PathVariable int answerNo) {
		try {
			service.subLike(answerNo);
			Map<String, Integer> map = new HashMap<String, Integer>();
			map.put("like", service.selectLikeByAnswerNo(answerNo));
			return new ResponseEntity<Map<String, Integer>>(map, HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
