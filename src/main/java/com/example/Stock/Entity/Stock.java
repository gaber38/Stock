package com.example.Stock.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "stocks")
@Data
@NoArgsConstructor
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String description;

    private double currentPrice;

    private LocalDateTime lastUpdate;

    public Stock(String name, String description, double currentPrice)
    {
        this.name = name;
        this.description = description;
        this.currentPrice = currentPrice;
    }
}
