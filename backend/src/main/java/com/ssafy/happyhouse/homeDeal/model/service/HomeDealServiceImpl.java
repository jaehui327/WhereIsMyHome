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
	public List<Map<String, Object>> selectAreaDongHouseInfo(String lat1, String lng1, String lat2, String lng2)
			throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectAreaDongHouseInfo(lat1, lng1, lat2, lng2);
	}

	@Override
	public List<Map<String, Object>> selectAreaGugunHouseInfo(String lat1, String lng1, String lat2, String lng2)
			throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectAreaGugunHouseInfo(lat1, lng1, lat2, lng2);
	}

	@Override
	public List<Map<String, Object>> selectAreaSidoHouseInfo(String lat1, String lng1, String lat2, String lng2)
			throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectAreaSidoHouseInfo(lat1, lng1, lat2, lng2);
	}

	@Override
	public List<Map<String, Object>> selectDongHouseInfo(String addrCode) throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectDongHouseInfo(addrCode);
	}

	@Override
	public List<Map<String, Object>> selectGugunHouseInfo(String addrCode) throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectGugunHouseInfo(addrCode);
	}

	@Override
	public List<Map<String, Object>> selectSidoHouseInfo(String addrCode) throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectSidoHouseInfo(addrCode);
	}

	@Override
	public String selectAreaAvgDealAmount(String addrCode) throws SQLException {
		// TODO Auto-generated method stub
		String ret = "";
		if (addrCode.length() == 10) {
			ret = mapper.selectDongAvgDealAmount(addrCode);
		} else if (addrCode.length() == 5) {
			ret = mapper.selectGugunAvgDealAmount(addrCode);
		} else if (addrCode.length() == 2) {
			ret = mapper.selectSidoAvgDealAmount(addrCode);
		}
		return ret;
	}

}
