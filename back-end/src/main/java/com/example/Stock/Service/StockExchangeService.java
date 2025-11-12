package com.example.Stock.Service;

import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.Exceptions.EntityAlreadyExistsException;
import com.example.Stock.Repository.StockExchangeRepository;
import com.example.Stock.dto.Request.StockExchangeRequest;
import com.example.Stock.utils.Constants;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;


@Service
public class StockExchangeService
{
    private final Logger logger = LoggerFactory.getLogger(StockExchangeService.class);

    private final StockExchangeRepository stockExchangeRepository;
    private final StockService stockService;

    @Autowired
    public StockExchangeService(StockExchangeRepository stockExchangeRepository, StockService stockService)
    {
        this.stockExchangeRepository = stockExchangeRepository;
        this.stockService = stockService;
    }

    /**
     * Retrieves a paginated list of stock exchanges, sorted according to the specified field and order.
     *
     * @param pageNumber the page number to retrieve (1-based index)
     * @param sortField  the field by which to sort the stock exchanges (e.g., "id", "name", "location")
     * @param sortOrder  the order in which to sort the stock exchanges ("asc" for ascending, "desc" for descending)
     * @return a {@link List} of {@link StockExchange} objects representing the stock exchanges on the specified page
     */
    public List<StockExchange> list(int pageNumber, String sortField, String sortOrder)
    {
        Sort sort = Sort.by(sortField).ascending();
        if (sortOrder.equalsIgnoreCase(Constants.DESCENDING_ORDER))
        {
            sort = Sort.by(sortField).descending();
        }
        pageNumber = (pageNumber < 1) ? 0 : (pageNumber - 1);     // Page 1 (0 index)
        Pageable pageable = PageRequest.of(pageNumber, Constants.DEFAULT_PAGE_SIZE, sort);
        Page<StockExchange> page = this.stockExchangeRepository.findAll(pageable);
        if (page.isEmpty() && pageNumber != 0)
        {
            pageable = PageRequest.of(0, Constants.DEFAULT_PAGE_SIZE);
            page = this.stockExchangeRepository.findAll(pageable);
        }
        return page.getContent();
    }

    /**
     * Retrieves a stock exchange instance by its unique identifier.
     *
     * @param id the unique identifier of the stock exchange to retrieve
     * @return the {@link StockExchange} instance associated with the specified id
     * @throws NoSuchElementException if no stock exchange exists with the specified id
     */
    public StockExchange getStockExchange(long id)
    {
        Optional<StockExchange> entity = this.stockExchangeRepository.findById(id);
        return entity.orElseThrow();
    }

    /**
     * Creates a new stock exchange based on the provided request data.
     *
     * @param request the {@link StockExchangeRequest} containing the details of the stock exchange to create
     * @return a {@link StockExchange} containing the created {@link StockExchange} instance
     */
    public StockExchange create(StockExchangeRequest request)
    {
        StockExchange stockExchange = StockExchange.builder().name(request.getName()).description(request.getDescription()).build();
        stockExchange = this.stockExchangeRepository.save(stockExchange);
        logger.info("Stock Item with Id {} has been created", stockExchange.getId());
        return stockExchange;
    }

    /**
     * Updates an existing stock exchange with the provided request data.
     *
     * @param id      the unique identifier of the StockExchange to update
     * @param request the {@link StockExchangeRequest} containing the updated details of the stock exchange
     * @throws NoSuchElementException   if no stock exchange exists with the specified id
     */
    public void update(long id, StockExchangeRequest request)
    {
        StockExchange item = this.getStockExchange(id);
        if (request.getName() != null)
        {
            item.setName(request.getName());
        }
        if (request.getDescription() != null)
        {
            item.setDescription(request.getDescription());
        }
        this.stockExchangeRepository.save(item);
        logger.info("Stock Item with Id {} has been updated", id);
    }

    /**
     * Deletes a stock exchange by its unique identifier.
     *
     * @param id the unique identifier of the stock exchange to delete
     * @throws NoSuchElementException if no stock exchange exists with the specified id
     */
    @Transactional
    public void delete(long id)
    {
        StockExchange stockExchange = this.getStockExchange(id);
        this.stockExchangeRepository.delete(stockExchange);
        logger.info("Stock Item with Id {} has been deleted", id);
    }

    /**
     * Adds a stock to the specified stock exchange.
     *
     * @param id      the unique identifier of the stock exchange to which the stock will be added
     * @param stockId the unique identifier of the stock to add
     * @throws EntityAlreadyExistsException if stock exchange already contains this stock
     */
    public void add_stock(long id, long stockId)
    {
        StockExchange stockExchange = this.getStockExchange(id);
        Stock stock = this.stockService.getStock(stockId);
        stockExchange.addStock(stock);
        this.stockExchangeRepository.save(stockExchange);
        logger.info("Stock_id {} has been added to StockExchange {}", stockId, id);
    }

    /**
     * Removes a stock from the specified stock exchange.
     *
     * @param id      the unique identifier of the stock exchange from which the stock will be removed
     * @param stockId the unique identifier of the stock to remove
     * @throws NoSuchElementException if no stock exists with the specified id
     */
    public void remove_stock(long id, long stockId)
    {
        StockExchange item = this.getStockExchange(id);
        Stock stock = this.stockService.getStock(stockId);
        item.removeStock(stock);
        this.stockExchangeRepository.save(item);
        logger.info("Stock_id {} has been removed from StockExchange {}", stockId, id);
    }
}
