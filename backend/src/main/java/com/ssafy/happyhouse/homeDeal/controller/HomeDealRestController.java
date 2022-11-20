package com.ssafy.happyhouse.homeDeal.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.ssafy.happyhouse.homeDeal.model.HomeDealDto;
import com.ssafy.happyhouse.homeDeal.model.HouseInfoDto;
import com.ssafy.happyhouse.homeDeal.model.service.HomeDealService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/homedeal")
@CrossOrigin(originPatterns = "http://localhost:8000")
@Api("HomeDealRestController API V1")
public class HomeDealRestController {

	private static final Logger logger = LoggerFactory.getLogger(HomeDealRestController.class);

	private HomeDealService service;

	@Autowired
	public HomeDealRestController(HomeDealService service) {
		this.service = service;
	}

	@GetMapping(value = "/{year}/{month}/{regcode}")
	public ResponseEntity<?> selectHouseDeal(@PathVariable String regcode, @PathVariable int year,
			@PathVariable int month) {
		try {
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("regcode", regcode);
			map.put("year", year);
			map.put("month", month);
			List<HomeDealDto> list = service.selectHouseDeal(map);
			logger.info("list {}", list);
			if (list != null && !list.isEmpty()) {
				return new ResponseEntity<List<HomeDealDto>>(list, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	@GetMapping(value = "/{regcode}")
	public ResponseEntity<?> selectHouseInfo(@PathVariable String regcode) {
		try {
			List<HomeDealDto> list = service.selectHouseInfo(regcode);
			if (list != null && !list.isEmpty()) {
				return new ResponseEntity<List<HomeDealDto>>(list, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	@GetMapping("/{lat1}/{lng1}/{lat2}/{lng2}/{level}")
	public ResponseEntity<?> selectHouseInfo(@PathVariable String lat1, @PathVariable String lng1,
			@PathVariable String lat2, @PathVariable String lng2, @PathVariable int level) {
		try {
			Map<String, Object> resultMap = new HashMap<>();
			List<HouseInfoDto> houseInfo = service.selectHouseInfo(lat1, lng1, lat2, lng2);
			if (level < 4) {
				// 개별
				return new ResponseEntity<List<HouseInfoDto>>(houseInfo, HttpStatus.OK);
			} else if (level < 6) {
				// 동
				for(int i = 0; i < houseInfo.size(); i++) {
					String dongCode = houseInfo.get(i).getDongCode();
					if (!resultMap.containsKey(dongCode)) {
						resultMap.put(dongCode, service.selectAreaDongHouseInfo(dongCode));
					}
				}
			} else if (level < 10) {
				// 시군구
				for(int i = 0; i < houseInfo.size(); i++) {
					String gugunCode = houseInfo.get(i).getDongCode().substring(0, 5);
					if (!resultMap.containsKey(gugunCode)) {
						resultMap.put(gugunCode, service.selectAreaGugunHouseInfo(gugunCode));
					}
				}
			} else {
				// 도
				for(int i = 0; i < houseInfo.size(); i++) {
					String sidoCode = houseInfo.get(i).getDongCode().substring(0, 2);
					if (!resultMap.containsKey(sidoCode)) {
						resultMap.put(sidoCode, service.selectAreaSidoHouseInfo(sidoCode));
					}
				}
			}
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
