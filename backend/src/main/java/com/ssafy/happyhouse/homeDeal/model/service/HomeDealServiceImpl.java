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
	public List<HouseInfoDto> selectHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException {
		return mapper.selectAreaHouseInfo(lat1, lng1, lat2, lng2);
	}

	@Override
	public List<Map<String, Object>> selectAreaDongHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectAreaDongHouseInfo(lat1, lng1, lat2, lng2);
	}

	@Override
	public List<Map<String, Object>> selectAreaGugunHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectAreaGugunHouseInfo(lat1, lng1, lat2, lng2);
	}

	@Override
	public List<Map<String, Object>> selectAreaSidoHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectAreaSidoHouseInfo(lat1, lng1, lat2, lng2);
	}

}
