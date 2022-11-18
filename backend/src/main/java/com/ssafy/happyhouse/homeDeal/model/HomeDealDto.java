package com.ssafy.happyhouse.homeDeal.model;

public class HomeDealDto {
	private String aptCode;
	private String apartmentName;
	private String address;
	private String dongName;
	private String area;
	private String floor;
	private int buildYear;
	private String dealAmount;
	private int dealYear;
	private int dealMonth;
	private int dealDay;
	private String lat;
	private String lng;
	public HomeDealDto() {
		super();
	}
	public HomeDealDto(String aptCode, String apartmentName, String address, String dongName, String area, String floor,
			int buildYear, String dealAmount, int dealYear, int dealMonth, int dealDay, String lat, String lng) {
		super();
		this.aptCode = aptCode;
		this.apartmentName = apartmentName;
		this.address = address;
		this.dongName = dongName;
		this.area = area;
		this.floor = floor;
		this.buildYear = buildYear;
		this.dealAmount = dealAmount;
		this.dealYear = dealYear;
		this.dealMonth = dealMonth;
		this.dealDay = dealDay;
		this.lat = lat;
		this.lng = lng;
	}
	public String getAptCode() {
		return aptCode;
	}
	public void setAptCode(String aptCode) {
		this.aptCode = aptCode;
	}
	public String getApartmentName() {
		return apartmentName;
	}
	public void setApartmentName(String apartmentName) {
		this.apartmentName = apartmentName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDongName() {
		return dongName;
	}
	public void setDongName(String dongName) {
		this.dongName = dongName;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getFloor() {
		return floor;
	}
	public void setFloor(String floor) {
		this.floor = floor;
	}
	public int getBuildYear() {
		return buildYear;
	}
	public void setBuildYear(int buildYear) {
		this.buildYear = buildYear;
	}
	public String getDealAmount() {
		return dealAmount;
	}
	public void setDealAmount(String dealAmount) {
		this.dealAmount = dealAmount;
	}
	public int getDealYear() {
		return dealYear;
	}
	public void setDealYear(int dealYear) {
		this.dealYear = dealYear;
	}
	public int getDealMonth() {
		return dealMonth;
	}
	public void setDealMonth(int dealMonth) {
		this.dealMonth = dealMonth;
	}
	public int getDealDay() {
		return dealDay;
	}
	public void setDealDay(int dealDay) {
		this.dealDay = dealDay;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLng() {
		return lng;
	}
	public void setLng(String lng) {
		this.lng = lng;
	}
	@Override
	public String toString() {
		return "HomeDealDto [aptCode=" + aptCode + ", apartmentName=" + apartmentName + ", address=" + address
				+ ", dongCode=" + dongName + ", area=" + area + ", floor=" + floor + ", buildYear=" + buildYear
				+ ", dealAmount=" + dealAmount + ", dealYear=" + dealYear + ", dealMonth=" + dealMonth + ", dealDay="
				+ dealDay + ", lat=" + lat + ", lng=" + lng + "]";
	}
	
}
