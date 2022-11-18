package com.ssafy.happyhouse.notice.model.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.notice.model.NoticeDto;
import com.ssafy.happyhouse.notice.model.mapper.NoticeMapper;

@Service
public class NoticeServiceImpl implements NoticeService {
	
	NoticeMapper mapper;

	@Autowired
	public NoticeServiceImpl(NoticeMapper dao) {
		this.mapper = dao;
	}

	public void setDao(NoticeMapper dao) {
		this.mapper = dao;
	}

	@Override
	public int insertNotice(NoticeDto notice) throws SQLException {
		return mapper.insertNotice(notice);
	}

	@Override
	public void modfiyNotice(NoticeDto notice) throws SQLException {
		mapper.modfiyNotice(notice);
	}

	@Override
	public void deleteNotice(int noticeNo) throws SQLException {
		mapper.deleteNotice(noticeNo);
	}

	@Override
	public NoticeDto selectByNo(int noticeNo) throws SQLException {
		return mapper.selectByNo(noticeNo);
	}

	@Override
	public void updateHit(int noticeNo) throws SQLException {
		mapper.updateHit(noticeNo);
	}

	@Override
	public List<NoticeDto> selectAll() throws SQLException {
		return mapper.selectAll();
	}

}
