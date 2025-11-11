package com.example.Stock.Repository;

import com.example.Stock.Entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long>
{
    @Query(value = "SELECT se.id FROM stock_exchange_stocks ses \n" +
            "JOIN stock_exchanges se ON se.id = ses.stock_exchange_id\n" +
            "WHERE ses.stock_id=:stockId;", nativeQuery = true)
    List<Long> findStockExchanges(@Param("stockId") long stockId);
}
