package com.ssafy.happyhouse.notice.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.notice.model.NoticeDto;
import com.ssafy.happyhouse.util.SearchDto;

public interface NoticeMapper {
	

	List<NoticeDto> selectAllNotice(SearchDto searchDto) throws SQLException;
	NoticeDto selectByNo(int no) throws SQLException;
	void insertNotice(Map<String, Object> map) throws SQLException;
	void updateHit(int no) throws SQLException;
	void deleteNotice(int no) throws SQLException;
	int getTotalCnt(SearchDto searchDto) throws SQLException;
}
