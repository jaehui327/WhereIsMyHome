package com.ssafy.happyhouse.notice.model.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.notice.model.NoticeDto;
import com.ssafy.happyhouse.notice.model.mapper.NoticeMapper;
import com.ssafy.happyhouse.util.SearchDto;

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
	public Map<String, Object> selectAllNotice(SearchDto searchDto) throws SQLException {
		// TODO Auto-generated method stub
		Map<String, Object> map = new HashMap<String, Object>();

		int start = searchDto.getPg() == 0 ? 0 : (searchDto.getPg() - 1) * searchDto.getSpp();
		searchDto.setStart(start);
		List<NoticeDto> Notices = mapper.selectAllNotice(searchDto);
		map.put("notices", Notices);
		
		int totalCnt = mapper.getTotalCnt(searchDto);
		map.put("totalCnt", totalCnt);
		
		return map;
	}

	@Override
	public NoticeDto selectByNo(int no) throws SQLException {
		// TODO Auto-generated method stub
		return mapper.selectByNo(no);
	}

	@Override
	public void insertNotice(Map<String, Object> map) throws SQLException {
		// TODO Auto-generated method stub
		mapper.insertNotice(map);
	}


	@Override
	public void updateHit(int no) throws SQLException {
		// TODO Auto-generated method stub
		mapper.updateHit(no);
	}

	@Override
	public void deleteNotice(int no) throws SQLException {
		// TODO Auto-generated method stub
		mapper.deleteNotice(no);
	}



}
