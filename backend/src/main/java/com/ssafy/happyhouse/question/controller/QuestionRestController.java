package com.ssafy.happyhouse.question.controller;

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

import com.ssafy.happyhouse.question.model.QuestionDto;
import com.ssafy.happyhouse.question.model.service.QuestionService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/question")
@CrossOrigin(originPatterns = "http://localhost:8000")
@Api("QuestionRestConroller API V1")
public class QuestionRestController {

	private static final Logger logger = LoggerFactory.getLogger(QuestionRestController.class);

	@Autowired
	QuestionService service;

	@GetMapping()
	public ResponseEntity<?> selectAllQuestion() {
		try {
			logger.debug("listQuestion - {}", service.selectAllQuestion());
			List<QuestionDto> list = service.selectAllQuestion();
			if (list != null && !list.isEmpty()) {
				return new ResponseEntity<List<QuestionDto>>(list, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@Transactional
	@GetMapping("/{no}")
	public ResponseEntity<?> selectByNo(@PathVariable int no) {
		try {
			service.updateHit(no);
			QuestionDto question = service.selectByNo(no);
			return new ResponseEntity<QuestionDto>(question, HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@Transactional
	@PostMapping(value = "")
	public ResponseEntity<?> insertQuestion(@RequestBody Map<String, Object> map) {
		try {
			logger.debug("insertQuestion - {}",  map);
			service.insertQuestion(map);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@Transactional
	@PutMapping()
	public ResponseEntity<?> updateQuestion(@RequestBody Map<String, Object> map) {
		try {
			service.updateQuestion(map);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@Transactional
	@DeleteMapping("/{no}")
	public ResponseEntity<?> deleteQuestion(@PathVariable int no) {
		try {
			service.deleteQuestion(no);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
