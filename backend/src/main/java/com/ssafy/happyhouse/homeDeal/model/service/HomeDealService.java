package com.ssafy.happyhouse.homeDeal.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.homeDeal.model.HomeDealDto;
import com.ssafy.happyhouse.homeDeal.model.HouseInfoDto;

public interface HomeDealService {
	List<HomeDealDto> selectHouseDeal(Map<String, Object> map) throws SQLException;
	List<HomeDealDto> selectHouseInfo(String regcode) throws SQLException;
	List<HouseInfoDto> selectHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException;
	List<Map<String, Object>> selectAreaDongHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException;
	List<Map<String, Object>> selectAreaGugunHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException;
	List<Map<String, Object>> selectAreaSidoHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException;
		
	List<Map<String, Object>> selectDongHouseInfo(String addrCode) throws SQLException;
	List<Map<String, Object>> selectGugunHouseInfo(String addrCode) throws SQLException;
	List<Map<String, Object>> selectSidoHouseInfo(String addrCode) throws SQLException;
	String selectAreaAvgDealAmount(String addrCode) throws SQLException;
}
