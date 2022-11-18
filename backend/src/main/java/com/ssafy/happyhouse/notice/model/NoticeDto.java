package com.ssafy.happyhouse.notice.model;

public class NoticeDto {
	private int no;
	private String id;
	private String subject;
	private String content;
	private int hit;
	private String time;
	
	public NoticeDto(int no, String id, String subject, String content, int hit, String time) {
		// db에서 꺼낼 때 사용
		super();
		this.no = no;
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.hit = hit;
		this.time = time;
	}
	
	public NoticeDto(int no, String subject, String content) {
		// 레코드 수정 시 사용
		this.no = no;
		this.subject = subject;
		this.content = content;
	}

	public NoticeDto(String id, String subject, String content) {
		// db에 넣을 때 사용
		this.id = id;
		this.subject = subject;
		this.content = content;
	}
	
	public int getNo() {
		return no;
	}
	
	public void setNo(int no) {
		this.no = no;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getSubject() {
		return subject;
	}
	
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public int getHit() {
		return hit;
	}
	
	public void setHit(int hit) {
		this.hit = hit;
	}
	
	public String getTime() {
		return time;
	}
	
	public void setRegisterTime(String time) {
		this.time = time;
	}
	
	@Override
	public String toString() {
		return "NoticeDto [noticeNo=" + no + ", userId=" + id + ", subject=" + subject + ", content="
				+ content + ", hit=" + hit + ", registerTime=" + time + "]";
	}
	
}
