package com.ssafy.happyhouse.homeDeal.model;

import lombok.Data;

@Data
public class HouseInfoDto {
	
	private String aptCode;
	private String apartmentName;
	private int buildYear;
	private String roadName;
	private String roadNameBonbun;
	private String roadNameBubun;
	private String lat;
	private String lng;
	private String avg;
}
