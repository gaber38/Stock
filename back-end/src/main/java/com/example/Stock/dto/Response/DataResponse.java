package com.example.Stock.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.Instant;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class DataResponse<T> extends GeneralResponse
{
    @JsonProperty(value = "count")
    private long count;

    @JsonProperty(value = "data")
    private T data;

    public DataResponse(String status, String code, String message, long count, T data)
    {
        super(status, code, message);
        this.count = count;
        this.data = data;
    }
}