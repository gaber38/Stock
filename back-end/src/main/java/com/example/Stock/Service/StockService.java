package com.example.Stock.Service;

import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.Repository.StockExchangeRepository;
import com.example.Stock.Repository.StockRepository;
import com.example.Stock.dto.Request.StockRequest;
import com.example.Stock.utils.Constants;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StockService
{
    private final Logger logger = LoggerFactory.getLogger(StockService.class);

    private final StockRepository stockRepository;
    private final StockExchangeRepository stockExchangeRepository;

    @Autowired
    public StockService(StockRepository stockRepository, StockExchangeRepository stockExchangeRepository)
    {
        this.stockRepository = stockRepository;
        this.stockExchangeRepository = stockExchangeRepository;
    }

    /**
     * Retrieves a paginated list of stock items, sorted according to the specified field and order.
     *
     * @param pageNumber the page number to retrieve (1-based index)
     * @param sortField  the field by which to sort the stocks (e.g., "id", "name", "currentPrice")
     * @param sortOrder  the order in which to sort the stocks ("asc" for ascending, "desc" for descending)
     * @return a {@link List} of {@link Stock} objects representing the stocks on the specified page
     */
    public List<Stock> list(int pageNumber, String sortField, String sortOrder)
    {
        Sort sort = Sort.by(sortField).ascending();
        if (sortOrder.equalsIgnoreCase(Constants.DESCENDING_ORDER))
        {
            sort = Sort.by(sortField).descending();
        }
        pageNumber = (pageNumber < 1) ? 0 : (pageNumber - 1);     // Page 1 (0 index)
        Pageable pageable = PageRequest.of(pageNumber, Constants.DEFAULT_PAGE_SIZE, sort);
        Page<Stock> page = this.stockRepository.findAll(pageable);
        if (page.isEmpty() && pageNumber != 0)
        {
            pageable = PageRequest.of(0, Constants.DEFAULT_PAGE_SIZE);
            page = this.stockRepository.findAll(pageable);
        }
        return page.getContent();
    }

    /**
     * Retrieves a stock instance by its unique identifier.
     *
     * @param id the unique identifier of the stock to retrieve
     * @return the {@link Stock} instance associated with the specified id
     * @throws NoSuchElementException if no stock exchange exists with the specified id
     */
    public Stock getStock(long id)
    {
        Optional<Stock> entity = this.stockRepository.findById(id);
        return entity.orElseThrow();
    }

    /**
     * Creates a new stock item based on the provided request data.
     *
     * @param request the data required to create a new stock, encapsulated in a {@link StockRequest} object
     * @return a {@link Stock} containing the details of the created stock
     */
    public Stock create(StockRequest request)
    {
        Stock item = Stock.builder().name(request.getName()).description(request.getDescription()).currentPrice(request.getCurrentPrice()).build();
        item = this.stockRepository.save(item);
        logger.info("Stock Item with Id {} has been created", item.getId());
        return item;
    }

    /**
     * Updates an existing stock item with the provided data.
     *
     * @param id      the unique identifier of the stock to update
     * @param request the data to update the stock, encapsulated in a {@link StockRequest} object
     */
    public void update(long id, StockRequest request)
    {
        Stock item = this.getStock(id);
        if (request.getName() != null)
        {
            item.setName(request.getName());
        }
        if (request.getDescription() != null)
        {
            item.setDescription(request.getDescription());
        }
        if (request.getCurrentPrice() != null)
        {
            item.setCurrentPrice(request.getCurrentPrice());
        }
        this.stockRepository.save(item);
        logger.info("Stock Item with Id {} has been updated", id);
    }

    /**
     * Deletes a stock item by its unique identifier.
     *
     * @param id the unique identifier of the stock to update
     */
    @Transactional
    public void delete(long id)
    {
        Stock item = this.getStock(id);
        List<Long> stockExchangesIds = this.stockRepository.findStockExchanges(id);
        for (Long stockExchangesId : stockExchangesIds)
        {
            Optional<StockExchange> stockExchange = this.stockExchangeRepository.findById(stockExchangesId);
            if (stockExchange.isPresent())
            {
                StockExchange stockExchangeItem = stockExchange.get();
                stockExchangeItem.removeStock(item);
                this.stockExchangeRepository.save(stockExchangeItem);
            }
        }
        this.stockRepository.delete(item);
        logger.info("Stock Item with Id {} has been deleted", id);
    }
}
