package com.ssafy.happyhouse.homeDeal.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.homeDeal.model.HomeDealDto;
import com.ssafy.happyhouse.homeDeal.model.HouseInfoDto;

public interface HomeDealService {
	List<HomeDealDto> selectHouseDeal(Map<String, Object> map) throws SQLException;
	List<HomeDealDto> selectHouseInfo(String regcode) throws SQLException;
	List<HouseInfoDto> selectAll() throws SQLException;
}
