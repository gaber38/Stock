package com.example.Stock.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class SuccessListResponse<T> extends GeneralResponse{

    @JsonProperty(value = "count")
    private long count;

    @JsonProperty(value = "data")
    private List<T> data;

    public SuccessListResponse(String code, String message, long count, List<T> data) {
        super(code, message);
        this.count = count;
        this.data = data;
    }

    @Override
    public String toString()
    {
        return "SuccessListResponse{" +
                "message: " + getMessage() +
                ", code: " + getCode() +
                ", count: " + count +
                ", data: " + data +
                '}';
    }
}