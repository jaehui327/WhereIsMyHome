package com.ssafy.happyhouse.notice.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.notice.model.NoticeDto;
import com.ssafy.happyhouse.util.SearchDto;

public interface NoticeService {
	
	Map<String, Object> selectAllNotice(SearchDto searchDto) throws SQLException;
	NoticeDto selectByNo(int no) throws SQLException;
	void insertNotice(Map<String, Object> map) throws SQLException;
	void updateHit(int no) throws SQLException;
	void deleteNotice(int no) throws SQLException;

}
