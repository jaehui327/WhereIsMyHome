package com.ssafy.happyhouse.user.model;

import lombok.Data;

@Data
public class UserDto {
	
	private String id;
	private String pw;
	private String name;
	private String address;
	private String phone;
	private String role;
	private String token;
}
