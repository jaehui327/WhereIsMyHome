package com.ssafy.happyhouse.roi.model.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.roi.model.ROIDto;
import com.ssafy.happyhouse.roi.model.mapper.ROIMapper;

@Service
public class ROIServiceImpl implements ROIService {
	ROIMapper mapper;
	
	@Autowired
	public ROIServiceImpl(ROIMapper dao) {
		super();
		this.mapper = dao;
	}

	@Override
	public int insertROI(ROIDto roi) throws SQLException {
		return mapper.insertROI(roi);
	}

	@Override
	public void deleteROI(String user_id, String dongCode) throws SQLException {
		mapper.deleteROI(user_id, dongCode);
	}

	@Override
	public List<ROIDto> selectAll(String user_id) throws SQLException {
		return mapper.selectAll(user_id);
	}

}
