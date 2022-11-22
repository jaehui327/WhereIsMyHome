package com.ssafy.happyhouse.homeDeal.model;

import lombok.Data;

@Data
public class HomeDealDto {
	private String no;
	private String aptCode;
	private String area;
	private String floor;
	private String dealAmount;
	private int dealYear;
	private int dealMonth;
	private int dealDay;

}
