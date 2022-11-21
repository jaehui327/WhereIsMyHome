package com.ssafy.happyhouse.homeDeal.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.homeDeal.model.HomeDealDto;
import com.ssafy.happyhouse.homeDeal.model.HouseInfoDto;

public interface HomeDealMapper {
	List<HomeDealDto> selectHouseDeal(Map<String, Object> map) throws SQLException;
	List<HomeDealDto> selectHouseInfo(String regcode) throws SQLException;
	List<HouseInfoDto> selectAreaHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException;
	List<Map<String, Object>> selectAreaDongHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException;
	List<Map<String, Object>> selectAreaGugunHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException;
	List<Map<String, Object>> selectAreaSidoHouseInfo(String lat1, String lng1, String lat2, String lng2) throws SQLException;
	
	List<Map<String, Object>> selectDongHouseInfo(String addrCode);
	List<Map<String, Object>> selectGugunHouseInfo(String addrCode);
	List<Map<String, Object>> selectSidoHouseInfo(String addrCode);
	String selectDongAvgDealAmount(String addrCode);
	String selectGugunAvgDealAmount(String addrCode);
	String selectSidoAvgDealAmount(String addrCode);
}
