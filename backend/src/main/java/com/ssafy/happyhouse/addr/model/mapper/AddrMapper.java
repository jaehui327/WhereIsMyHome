package com.ssafy.happyhouse.addr.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.addr.model.AddrDto;

public interface AddrMapper {
	List<AddrDto> selectSido() throws SQLException;
	List<AddrDto> selectGugun(String sido) throws SQLException;
	List<AddrDto> selectDong(String gugun) throws SQLException;
}
