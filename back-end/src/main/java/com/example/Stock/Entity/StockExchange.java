package com.example.Stock.Entity;

import com.example.Stock.Exceptions.EntityAlreadyExistsException;
import com.example.Stock.utils.Messages;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;

@Entity
@Table(name = "stock_exchanges")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockExchange
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private String description;

    @Builder.Default
    private boolean liveInMarket = false;

    @Builder.Default
    @ManyToMany
    @JoinTable(name = "stock_exchange_stocks",
            joinColumns = @JoinColumn(name = "stock_exchange_id"),
            inverseJoinColumns = @JoinColumn(name = "stock_id")
    )
    private Set<Stock> stocks = new HashSet<>();

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime lastUpdate;

    public void addStock(Stock stock)
    {
        if (stocks.contains(stock))
        {
            throw new EntityAlreadyExistsException("Duplicate item found");
        }
        stocks.add(stock);
        if (stocks.size() >= 10)
        {
            this.setLiveInMarket(true);
        }
    }

    public void removeStock(Stock stock)
    {
        if (!stocks.contains(stock))
        {
            throw new NoSuchElementException(Messages.ITEM_NOT_FOUND.getMessage());
        }
        stocks.remove(stock);
        if (stocks.size() < 10)
        {
            this.setLiveInMarket(false);
        }
    }
}
