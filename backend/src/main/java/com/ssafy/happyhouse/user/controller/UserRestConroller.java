package com.ssafy.happyhouse.user.controller;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.json.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParser;
import com.ssafy.happyhouse.jwt.service.JwtService;
import com.ssafy.happyhouse.jwt.service.JwtServiceImpl;
import com.ssafy.happyhouse.user.model.UserDto;
import com.ssafy.happyhouse.user.model.service.UserService;
import com.ssafy.happyhouse.util.SHA256;

@RestController
@RequestMapping("/user")
@CrossOrigin(originPatterns = "http://localhost:8000")
public class UserRestConroller {

	private static final Logger logger = LoggerFactory.getLogger(UserRestConroller.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private JwtServiceImpl JwtService;
	
	@Autowired
	private UserService userService;

	// 회원 가입시 아이디 중복 확인
	@GetMapping("/join/idcheck/{id}")
	private ResponseEntity<?> idCheck(@PathVariable String id) {
		try {
			return new ResponseEntity<Integer>(userService.idCheck(id), HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 회원가입
	@PostMapping("/join")
	private ResponseEntity<?> join(@RequestBody UserDto user) {
		try {
			user.setPw(SHA256.encodeSha256(user.getPw()));
			userService.join(user);
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 로그인
	@PostMapping("/login")
	private ResponseEntity<?> login(@RequestBody Map<String, Object> map, HttpSession session,
			HttpServletResponse response) {
		try {
			map.put("pw", SHA256.encodeSha256((String) map.get("pw")));
			UserDto user = userService.loginUser(map);
			logger.info("user 정보 {}", user);
			if (user != null) {
				session.setAttribute("loginUser", user);

				Cookie cookie = new Cookie("loginUser", URLEncoder.encode((String) map.get("id"), "utf-8"));
				cookie.setPath("/");
				cookie.setMaxAge(60 * 60 * 24 * 365 * 40);
				response.addCookie(cookie);
				user.setPw(null);
				return new ResponseEntity<UserDto>(user, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 회원정보 수정
	@PutMapping("/{id}")
	private ResponseEntity<?> update(@PathVariable String id, @ModelAttribute UserDto user) {
		try {
			user.setPw(SHA256.encodeSha256(user.getPw()));
			userService.modify(user);
			UserDto u = userService.getUser(user.getId());
			return new ResponseEntity<UserDto>(u, HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 회원 탈퇴
	@DeleteMapping("/{id}")
	private ResponseEntity<?> delete(@PathVariable String id) {
		try {
			userService.delete(id);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 로그아웃
	@GetMapping("/logout/{id}")
	public ResponseEntity<?> logout(@PathVariable("id") String id) {
		Map<String, Object> map = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		try {
			userService.deleRefreshToken(id);
			map.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED;
		} catch (Exception e) {
			logger.error("로그아웃 실패: {}", e);
			map.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(map, status);
	}

	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
