package com.ssafy.happyhouse.user.model.mapper;

import java.sql.SQLException;
import java.util.Map;

import com.ssafy.happyhouse.user.model.UserDto;

public interface UserMapper {
	
	int idCheck(String id) throws SQLException; // 회원 가입시 아이디 중복 확인
	void join(UserDto user) throws SQLException; // 회원가입
	UserDto loginUser(Map<String, Object> map) throws SQLException; // 로그인
	
	UserDto getUser(String id) throws SQLException;
	void modify(Map<String, Object> map) throws SQLException; // 회원정보 수정
	void delete(String id) throws SQLException; // 회원 탈퇴
	
	public void saveRefreshToken(Map<String, String> map) throws SQLException;
	public Object getRefreshToken(String userid) throws SQLException;
	public void deleteRefreshToken(Map<String, String> map) throws SQLException;
}
