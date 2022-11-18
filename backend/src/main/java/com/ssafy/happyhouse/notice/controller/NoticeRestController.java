package com.ssafy.happyhouse.notice.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.notice.model.NoticeDto;
import com.ssafy.happyhouse.notice.model.service.NoticeService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/notice")
@CrossOrigin("*")
public class NoticeRestController {

	private static final Logger logger = LoggerFactory.getLogger(NoticeRestController.class);
	
	private NoticeService service;
	
	@Autowired
	public NoticeRestController(NoticeService service) {
		this.service = service;
	}
	
	// 글 작성
	@PostMapping()
	private ResponseEntity<?> insertNotice(@RequestBody NoticeDto notice) {
		try {
			service.insertNotice(notice);
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	// 글 수정
	@PutMapping("/{noticeNo}")
	private ResponseEntity<?> modfiyNotice(@PathVariable int noticeNo, @RequestBody NoticeDto notice) {
		try {
			service.modfiyNotice(notice);
			return new ResponseEntity<NoticeDto>(service.selectByNo(noticeNo), HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	// 글 삭제
	@DeleteMapping("/{noticeNo}")
	private ResponseEntity<?> deleteNotice(@PathVariable int noticeNo) {
		try {
			service.deleteNotice(noticeNo);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	// 글 조회
	@GetMapping("/{noticeNo}")
	private ResponseEntity<?> selectByNo(int noticeNo) {
		try {
			NoticeDto notice = service.selectByNo(noticeNo);
			if (notice != null) {
				return new ResponseEntity<NoticeDto>(notice, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	// 조회수 증가
	@PostMapping("/{noticeNo}")
	private ResponseEntity<?> updateHit(int noticeNo) {
		try {
			service.updateHit(noticeNo);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	// 모든 글 조회
	@GetMapping()
	private ResponseEntity<?> selectAll() {
		try {
			List<NoticeDto> notices = service.selectAll();
			if (notices != null && !notices.isEmpty()) {
				return new ResponseEntity<List<NoticeDto>>(notices, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
