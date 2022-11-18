package com.ssafy.happyhouse.notice.model.mapper;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.happyhouse.notice.model.NoticeDto;

public interface NoticeMapper {
	
	int insertNotice(NoticeDto notice) throws SQLException; // 글 작성
	void modfiyNotice(NoticeDto notice) throws SQLException; // 글 수정
	void deleteNotice(int noticeNo) throws SQLException; // 글 삭제
	NoticeDto selectByNo(int noticeNo) throws SQLException; // 글 조회
	void updateHit(int noticeNo) throws SQLException; // 조회수 증가
	List<NoticeDto> selectAll() throws SQLException; // 모든 글 조회

}
