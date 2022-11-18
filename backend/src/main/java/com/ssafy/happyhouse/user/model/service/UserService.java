package com.ssafy.happyhouse.user.model.service;

import java.sql.SQLException;
import java.util.Map;

import com.ssafy.happyhouse.user.model.UserDto;

public interface UserService {
	
	int idCheck(String id) throws SQLException; // 회원 가입시 아이디 중복 확인
	void join(UserDto user) throws SQLException; // 회원가입
	UserDto loginUser(Map<String, Object> map) throws SQLException; // 로그인
	
	UserDto getUser(String id) throws SQLException;
	void modify(UserDto user) throws SQLException; // 회원정보 수정
	void delete(String id) throws SQLException; // 회원 탈퇴
	
	public void saveRefreshToken(String userid, String refreshToken) throws Exception;
	public Object getRefreshToken(String userid) throws Exception;
	public void deleRefreshToken(String userid) throws Exception;
	
}
