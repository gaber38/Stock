package com.example.Stock.Entity;

import com.example.Stock.Exceptions.EntityAlreadyExistsException;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;

@Entity
@Table(name = "stock_exchanges")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingBase.class)
public class StockExchange extends AuditingBase
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private String description;

    private boolean liveInMarket;

    @ManyToMany
    @JoinTable(name = "stock_exchange_stocks",
            joinColumns = @JoinColumn(name = "stock_exchange_id"),
            inverseJoinColumns = @JoinColumn(name = "stock_id")
    )
    private Set<Stock> stocks = new HashSet<>();

    public StockExchange(String name, String description, boolean liveInMarket)
    {
        this.name = name;
        this.description = description;
        this.liveInMarket = liveInMarket;
    }

    public void addStock(Stock stock)
    {
        if (stocks.contains(stock))
        {
            throw new EntityAlreadyExistsException("");
        }
        stocks.add(stock);
    }

    public void removeStock(Stock stock)
    {
        if (!stocks.contains(stock))
        {
            throw new NoSuchElementException("");
        }
        stocks.remove(stock);
    }
}
