package com.ssafy.happyhouse.news.model;

import lombok.Data;

@Data
public class NewsDto {
	String title;
	String originalLink;
	String link;
	String description;
	String pubDate;
}
