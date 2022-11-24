package com.ssafy.happyhouse.notice.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.notice.model.NoticeDto;
import com.ssafy.happyhouse.notice.model.service.NoticeService;
import com.ssafy.happyhouse.util.SearchDto;


@RestController
@RequestMapping("/notice")
@CrossOrigin(originPatterns = "http://localhost:8000")
public class NoticeRestController {

	private static final Logger logger = LoggerFactory.getLogger(NoticeRestController.class);
	private NoticeService service;
	
	@Autowired
	public NoticeRestController(NoticeService service) {
		this.service = service;
	}
//	
	@GetMapping()
	public ResponseEntity<?> selectAllNotice(SearchDto searchDto) {
		try {
			logger.debug("listQuestion - {}", service.selectAllNotice(searchDto));
			Map<String, Object> map = service.selectAllNotice(searchDto);
			if (map.get("notices") != null && !((List<?>) map.get("notices")).isEmpty()) {
				return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
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
			NoticeDto notice = service.selectByNo(no);
			return new ResponseEntity<NoticeDto>(notice, HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	@Transactional
	@PostMapping(value = "")
	public ResponseEntity<?> insertNotice(@RequestBody Map<String, Object> map) {
		try {
			logger.debug("insertQuestion - {}",  map);
			service.insertNotice(map);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	

	
	@Transactional
	@DeleteMapping("/{no}")
	public ResponseEntity<?> deleteNotice(@PathVariable int no) {
		try {
			service.deleteNotice(no);
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
