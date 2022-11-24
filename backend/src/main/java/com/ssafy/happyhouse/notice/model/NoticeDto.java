package com.ssafy.happyhouse.notice.model;

import lombok.Data;

@Data
public class NoticeDto {
	private int no;
	private String userId;
	private String title;
	private String content;
	private int hit;
	private String noticeTime;

}
