package com.ssafy.happyhouse.addr.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.addr.model.AddrDto;
import com.ssafy.happyhouse.addr.model.service.AddrService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/addr")
@CrossOrigin(originPatterns = "http://localhost:8000")
@Api("AddrRestConroller API V1")
public class AddrRestConroller {
	
	private static final Logger logger = LoggerFactory.getLogger(AddrRestConroller.class);

	private AddrService service;

	@Autowired
	public AddrRestConroller(AddrService service) {
		this.service = service;
	}

	@GetMapping(value = "/sido")
	public ResponseEntity<?> selectSido() {
		try {
			List<AddrDto> list = service.selectSido();
			if (list != null && !list.isEmpty()) {
				return new ResponseEntity<List<AddrDto>>(list, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@GetMapping(value = "/gugun/{sido}")
	public ResponseEntity<?> selectGugun(@PathVariable String sido) {
		try {
			List<AddrDto> list = service.selectGugun(sido);
			if (list != null && !list.isEmpty()) {
				return new ResponseEntity<List<AddrDto>>(list, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	@GetMapping(value = "/dong/{gugun}")
	public ResponseEntity<?> selectDong(@PathVariable String gugun) {
		try {
			List<AddrDto> list = service.selectDong(gugun);
			if (list != null && !list.isEmpty()) {
				return new ResponseEntity<List<AddrDto>>(list, HttpStatus.OK);
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
