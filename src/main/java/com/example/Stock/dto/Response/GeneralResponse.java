package com.example.Stock.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneralResponse {

    @JsonProperty(value = "code")
    private String code;

    @JsonProperty(value = "message")
    private String message;
}
