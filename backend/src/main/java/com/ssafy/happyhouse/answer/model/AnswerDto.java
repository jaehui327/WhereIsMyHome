package com.ssafy.happyhouse.answer.model;

import lombok.Data;

@Data
public class AnswerDto {
	private int answerNo;
	private int questionNo;
	private String content;
	private String userId;
	private String createTime;
	private String updateTime;
	private int like;
}
