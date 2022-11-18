package com.ssafy.happyhouse.roi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.roi.model.service.ROIService;

@RestController
@RequestMapping("/roi")
@CrossOrigin(originPatterns = "http://localhost:8000")
public class ROIRestController {

	private ROIService service;
	
	public ROIRestController(ROIService service) {
		this.service = service;
	}
	
	
	
	
}
