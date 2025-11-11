package com.example.Stock.dto.Request;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockExchangeRequest
{
    @NotBlank
    private String name;
    private String description;
}
