package com.ssafy.happyhouse.homeDeal.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.homeDeal.model.HomeDealDto;
import com.ssafy.happyhouse.homeDeal.model.HouseInfoDto;
import com.ssafy.happyhouse.homeDeal.model.mapper.HomeDealMapper;

@Service
public class HomeDealServiceImpl implements HomeDealService {

	HomeDealMapper mapper;

	@Autowired
	public HomeDealServiceImpl(HomeDealMapper mapper) {
		super();
		this.mapper = mapper;
	}

	@Override
	public List<HomeDealDto> selectHouseDeal(Map<String, Object> map) throws SQLException {
		return mapper.selectHouseDeal(map);
	}

	@Override
	public List<HomeDealDto> selectHouseInfo(String regcode) throws SQLException {
		return mapper.selectHouseInfo(regcode);
	}

	@Override
	public List<HouseInfoDto> selectAll() throws SQLException {
		return mapper.selectAll();
	}

}
