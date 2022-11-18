package com.ssafy.happyhouse.question.model;

import lombok.Data;

@Data
public class QuestionDto {
	private int no;
	private String userId;
	private String title;
	private String content;
	private String createTime;
	private String updateTime;
	private int hit;
}
