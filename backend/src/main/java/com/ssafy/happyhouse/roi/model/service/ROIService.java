package com.ssafy.happyhouse.roi.model.service;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.happyhouse.roi.model.ROIDto;

public interface ROIService {
	int insertROI(ROIDto roi) throws SQLException;
	void deleteROI(String user_id, String dongCode) throws SQLException; 
	List<ROIDto> selectAll(String user_id) throws SQLException; 
}
