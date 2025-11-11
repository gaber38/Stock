package com.example.Stock.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GeneralResponse
{
    @JsonProperty(value = "status")
    private String status;

    @JsonProperty(value = "code")
    private String code;

    @JsonProperty(value = "message")
    private String message;

    @JsonProperty(value= "timestamp")
    private Instant timestamp;

    @Builder
    public GeneralResponse(String status, String code, String message)
    {
        this.status = status;
        this.code = code;
        this.message = message;
        this.timestamp = Instant.now();
    }
}
