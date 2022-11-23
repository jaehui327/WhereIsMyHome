package com.ssafy.happyhouse.news.model.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.ssafy.happyhouse.news.model.NewsDto;

public interface NewsService {
	List<NewsDto> getNewsData() throws UnsupportedEncodingException, JsonMappingException, JsonProcessingException;

}
