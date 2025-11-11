package com.example.Stock.dto.Response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ErrorResponse extends GeneralResponse
{
    private Map<String, String> errors;

    public ErrorResponse(String status, String code, String message, Map<String, String> errors)
    {
        super(status, code, message);
        this.errors = errors;
    }
}
