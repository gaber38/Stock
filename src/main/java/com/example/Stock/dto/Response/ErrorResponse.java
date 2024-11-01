package com.example.Stock.dto.Response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
public class ErrorResponse extends GeneralResponse{

    private Map<String, String> errors;

    public ErrorResponse(String code, String message, Map<String, String> errors) {
        super(code, message);
        this.errors = errors;
    }

    public ErrorResponse(Map<String, String> errors) {
        this.errors = errors;
    }
}
