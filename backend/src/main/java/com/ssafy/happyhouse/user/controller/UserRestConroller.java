package com.ssafy.happyhouse.user.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	private JwtServiceImpl jwtService;
	
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
	private ResponseEntity<?> login(@RequestBody Map<String, Object> map,
			HttpSession session, HttpServletResponse response) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			map.put("pw", SHA256.encodeSha256((String) map.get("pw")));
			UserDto user = userService.loginUser(map);
			logger.info("user 정보 {}", user);
			if (user != null) {
				String accessToken = jwtService.createAccessToken("id", user.getId());
				String refreshToken = jwtService.createRefreshToken("id", user.getId());
				userService.saveRefreshToken(user.getId(), refreshToken);
				
				logger.debug("로그인 accessToken 정보: {}", accessToken);
				logger.debug("로그인 refreshToken 정보: {}", refreshToken);
				
				Cookie ATCookie = new Cookie("accessToken", URLEncoder.encode(accessToken, "utf-8"));
				ATCookie.setPath("/");
				ATCookie.setMaxAge(60 * 60 * 2);
				response.addCookie(ATCookie);
				
				Cookie RTCookie = new Cookie("refreshToken", URLEncoder.encode(refreshToken, "utf-8"));
				RTCookie.setPath("/");
				RTCookie.setMaxAge(60 * 60 * 24 * 7 * 2);
				response.addCookie(RTCookie);
				
				resultMap.put("role", user.getRole());
				resultMap.put("message", SUCCESS);
				resultMap.put("id", user.getId());
				resultMap.put("tel", user.getPhone());
				resultMap.put("address", user.getAddress());
				resultMap.put("name", user.getName());
				status = HttpStatus.ACCEPTED;
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			logger.error("로그인 실패: {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	// 회원정보 수정
	@PutMapping()
	private ResponseEntity<?> update(@RequestBody Map<String, Object> map) {
		try {
			map.put("pw", SHA256.encodeSha256((String)map.get("pw")));
			userService.modify(map);
			UserDto u = userService.getUser((String) map.get("id"));
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
	
	//acess token 재발급
	@PostMapping("/refresh/{id}")
	public ResponseEntity<?> refreshToken(@PathVariable("id") String id, @CookieValue String refreshToken, HttpServletResponse response) throws Exception {
		Map<String, Object> map = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		logger.debug("token: {}, id: {}", refreshToken, id);
		if (jwtService.checkToken(refreshToken)) {
			String accessToken = jwtService.createAccessToken("id", id);
			logger.debug("token: {}", accessToken);
			logger.debug("정상적으로 액세스 토큰 재발급!!!");
			
			Cookie ATCookie = new Cookie("accessToken", URLEncoder.encode(accessToken, "utf-8"));
			ATCookie.setPath("/");
			ATCookie.setMaxAge(60 * 60 * 2);
			response.addCookie(ATCookie);
			
			map.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED;
		} else {
			logger.debug("리프레쉬토큰도 사용불!!!!!!");
			status = HttpStatus.UNAUTHORIZED;
		}
		
		return new ResponseEntity<Map<String, Object>>(map, status);
	}

	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
