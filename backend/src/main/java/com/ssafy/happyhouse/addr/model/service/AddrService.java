package com.ssafy.happyhouse.addr.model.service;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.happyhouse.addr.model.AddrDto;

public interface AddrService {
	List<AddrDto> selectSido() throws SQLException;
	List<AddrDto> selectGugun(String sido) throws SQLException;
	List<AddrDto> selectDong(String gugun) throws SQLException;
}
