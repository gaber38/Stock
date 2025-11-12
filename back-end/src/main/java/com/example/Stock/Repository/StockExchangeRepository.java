package com.example.Stock.Repository;

import com.example.Stock.Entity.StockExchange;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockExchangeRepository extends JpaRepository<StockExchange, Long> {

    Page<StockExchange> findAll(Pageable pageable);
}
