package com.ssafy.happyhouse.roi.model;

public class ROIDto {

	String user_id;
	String dongCode;
	String sidoName;
	String gugunName;
	String dongName;
	
	public ROIDto(String user_id, String dongCode) {
		// 삽입시 사용
		this.user_id = user_id;
		this.dongCode = dongCode;
	}
	
	public ROIDto(String user_id, String dongCode, String sidoName, String gugunName, String dongName) {
		// 출력시 사용
		this.user_id = user_id;
		this.dongCode = dongCode;
		this.sidoName = sidoName;
		this.gugunName = gugunName;
		this.dongName = dongName;
	}
	
	public String getUser_id() {
		return user_id;
	}
	
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	
	public String getDongCode() {
		return dongCode;
	}
	
	public void setDongCode(String dongCode) {
		this.dongCode = dongCode;
	}
	
	public String getSidoName() {
		return sidoName;
	}
	
	public void setSidoName(String sidoName) {
		this.sidoName = sidoName;
	}
	
	public String getGugunName() {
		return gugunName;
	}
	
	public void setGugunName(String gugunName) {
		this.gugunName = gugunName;
	}
	
	public String getDongName() {
		return dongName;
	}
	
	public void setDongName(String dongName) {
		this.dongName = dongName;
	}
	
	@Override
	public String toString() {
		return "ROIDto [user_id=" + user_id + ", dongCode=" + dongCode + ", sidoName=" + sidoName + ", gugunName="
				+ gugunName + ", dongName=" + dongName + "]";
	}

}
