package com.ssafy.happyhouse.user.model.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.happyhouse.user.model.UserDto;
import com.ssafy.happyhouse.user.model.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {

	UserMapper mapper;
	
	@Autowired
	public UserServiceImpl(UserMapper dao) {
		this.mapper = dao;
	}

	@Override
	public int idCheck(String id) throws SQLException {
		return mapper.idCheck(id);
	}

	@Override
	public void join(UserDto user) throws SQLException {
		mapper.join(user);
	}

	@Override
	public UserDto loginUser(Map<String, Object> map) throws SQLException {
		return mapper.loginUser(map);
	}

	@Override
	public UserDto getUser(String id) throws SQLException {
		return mapper.getUser(id);
	}

	@Override
	public void modify(UserDto user) throws SQLException {
		mapper.modify(user);
	}

	@Override
	public void delete(String id) throws SQLException {
		mapper.delete(id);
	}

	@Override
	public void saveRefreshToken(String userid, String refreshToken) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("token", refreshToken);
		mapper.saveRefreshToken(map);
	}

	@Override
	public Object getRefreshToken(String userid) throws Exception {
		return mapper.getRefreshToken(userid);
	}

	@Override
	public void deleRefreshToken(String userid) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("token", null);
		mapper.deleteRefreshToken(map);
	}

	

}
