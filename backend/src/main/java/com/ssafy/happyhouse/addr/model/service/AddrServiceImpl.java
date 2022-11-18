package com.ssafy.happyhouse.addr.model.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.addr.model.AddrDto;
import com.ssafy.happyhouse.addr.model.mapper.AddrMapper;

@Service
public class AddrServiceImpl implements AddrService {
	
	AddrMapper mapper;
	
	@Autowired
	public AddrServiceImpl(AddrMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public List<AddrDto> selectSido() throws SQLException {
		return mapper.selectSido();
	}

	@Override
	public List<AddrDto> selectGugun(String sido) throws SQLException {
		return mapper.selectGugun(sido);
	}

	@Override
	public List<AddrDto> selectDong(String gugun) throws SQLException {
		return mapper.selectDong(gugun);
	}

}
