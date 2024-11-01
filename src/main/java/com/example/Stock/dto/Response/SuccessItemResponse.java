package com.example.Stock.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;


@Data
@NoArgsConstructor
public class SuccessItemResponse<T> extends GeneralResponse{

    @JsonProperty(value = "count")
    private long count;

    @JsonProperty(value = "data")
    private T data;

    public SuccessItemResponse(String code, String message, long count, T data) {
        super(code, message);
        this.count = count;
        this.data = data;
    }
}
