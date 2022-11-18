package com.ssafy.happyhouse.roi.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.happyhouse.roi.model.ROIDto;

public interface ROIMapper {
	int insertROI(ROIDto roi) throws SQLException; // 글 작성
	void deleteROI(String user_id, String dongCode) throws SQLException; // 글 삭제
	List<ROIDto> selectAll(String user_id) throws SQLException; // 모든 글 조회
	//String findDongCode(String sidoName, String gugunName, String dongName);
}
