package com.ssafy.happyhouse.news.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.news.model.NewsDto;
import com.ssafy.happyhouse.news.model.service.NewsService;


@RestController
@RequestMapping("/news")
@CrossOrigin(originPatterns = "http://localhost:8000")
public class NewsCrawlController {
	
	private NewsService service;
	
	@Autowired
	public NewsCrawlController(NewsService service) {
		// TODO Auto-generated constructor stub
		this.service = service;
	}
	
	@GetMapping
	public ResponseEntity<?> getNewsData() {
		try {
			
			List<NewsDto> list = service.getNewsData();
			
			return new ResponseEntity<List<NewsDto>>(list, HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}


	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
