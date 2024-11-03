package com.example.Stock.Service;

import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.Exceptions.InValidArgumentException;
import com.example.Stock.Repository.StockExchangeRepository;
import com.example.Stock.Repository.StockRepository;
import com.example.Stock.dto.Request.StockRequest;
import com.example.Stock.dto.Response.SuccessItemResponse;
import com.example.Stock.utils.Constants;
import com.example.Stock.utils.Messages;
import com.example.Stock.utils.ObjectValidator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class StockService
{
    private final Logger logger = Logger.getLogger(StockService.class.getName());

    private final StockRepository stockRepository;
    private final ObjectValidator<Stock> validator;
    private final StockExchangeRepository stockExchangeRepository;

    @Autowired
    public StockService(StockRepository stockRepository, ObjectValidator<Stock> validator, StockExchangeRepository stockExchangeRepository)
    {
        this.stockRepository = stockRepository;
        this.validator = validator;
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
        logger.logp(Level.INFO, StockService.class.getName(), "list", "Enter");
        Sort sort = Sort.by(sortField).ascending();
        if (sortOrder.equalsIgnoreCase(Constants.DESCENDING_ORDER))
        {
            sort = Sort.by(sortField).descending();
        }
        pageNumber = (pageNumber < 1) ? 0 : (pageNumber - 1);     // Page 1 (0 index)
        logger.logp(Level.INFO, StockService.class.getName(), "list",
                String.format("Parameters: field=%s, order=%s, pageNumber=%d", sortField, sortOrder, pageNumber));
        Pageable pageable = PageRequest.of(pageNumber, Constants.DEFAULT_PAGE_SIZE, sort);
        Page<Stock> page = this.stockRepository.findAll(pageable);
        if (page.isEmpty() && pageNumber != 0)
        {
            pageable = PageRequest.of(0, Constants.DEFAULT_PAGE_SIZE);
            page = this.stockRepository.findAll(pageable);
        }

        logger.logp(Level.INFO, StockService.class.getName(), "list",
                String.format("Number of stocks retrieved: %d", page.getTotalElements()));
        logger.logp(Level.INFO, StockService.class.getName(), "list", "Exit");
        return page.getContent();
    }


    /**
     * Retrieves a stock item by its unique identifier.
     *
     * @param id      the unique identifier of the stock to update
     * @return a {@link SuccessItemResponse} containing the stock details
     * @throws NoSuchElementException if no stock exchange exists with the specified id
     */
    public SuccessItemResponse<Stock> retrieve(long id)
    {
        logger.logp(Level.INFO, StockService.class.getName(), "retrieve", "Enter");
        logger.logp(Level.INFO, StockService.class.getName(), "retrieve", String.format("retrieving Item with Id = %s", id));
        Stock item = this.getInstance(id);
        logger.logp(Level.INFO, StockService.class.getName(), "retrieve", "Exit");
        return new SuccessItemResponse<Stock>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }


    /**
     * Creates a new stock item based on the provided request data.
     *
     * @param request the data required to create a new stock, encapsulated in a {@link StockRequest} object
     * @return a {@link SuccessItemResponse} containing the details of the created stock
     * @throws InValidArgumentException if no stock exchange exists with the specified id
     */
    public SuccessItemResponse<Stock> create(StockRequest request)
    {
        logger.logp(Level.INFO, StockService.class.getName(), "create", "Enter");
        logger.logp(Level.INFO, StockService.class.getName(), "create",
                String.format("Incoming Request is: %s", request));
        Stock item = new Stock(request.getName(), request.getDescription(), request.getCurrentPrice());

        Map<String, String> errors = validator.validate(item);
        if (!errors.isEmpty())
        {
            throw new InValidArgumentException(errors);
        }
        item = this.stockRepository.save(item);
        logger.logp(Level.INFO, StockService.class.getName(), "create",
                String.format("Stock item created: %s", item));
        logger.logp(Level.INFO, StockService.class.getName(), "create", "Exit");
        return new SuccessItemResponse<Stock>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }


    /**
     * Updates an existing stock item with the provided data.
     *
     * @param id      the unique identifier of the stock to update
     * @param request the data to update the stock, encapsulated in a {@link StockRequest} object
     * @return a {@link SuccessItemResponse} containing the details of the updated stock
     * @throws InValidArgumentException if no stock exchange exists with the specified id
     */
    public SuccessItemResponse<Stock> update(long id, StockRequest request)
    {
        logger.logp(Level.INFO, StockService.class.getName(), "update", "Enter");
        logger.logp(Level.INFO, StockService.class.getName(), "update",
                String.format("Incoming Request is: %s", request));
        Stock item = this.getInstance(id);
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
        Map<String, String> errors = validator.validate(item);
        if (!errors.isEmpty())
        {
            throw new InValidArgumentException(errors);
        }
        item = this.stockRepository.save(item);
        logger.logp(Level.INFO, StockService.class.getName(), "update", "Exit");
        logger.logp(Level.INFO, StockService.class.getName(), "update",
                String.format("Stock item updated: %s", item));
        return new SuccessItemResponse<Stock>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }

    /**
     * Deletes a stock item by its unique identifier.
     *
     * @param id the unique identifier of the stock to be deleted
     * @return a {@link SuccessItemResponse} indicating the result of the deletion operation
     */
    @Transactional
    public SuccessItemResponse<Stock> delete(long id)
    {
        logger.logp(Level.INFO, StockService.class.getName(), "delete", "Enter");
        logger.logp(Level.INFO, StockService.class.getName(), "delete", String.format("Item Id is: %s", id));
        Stock item = this.getInstance(id);
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
        logger.logp(Level.INFO, StockService.class.getName(), "delete", "Exit");
        return new SuccessItemResponse<Stock>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 0, null);
    }


    /**
     * Retrieves a stock instance by its unique identifier.
     *
     * @param id the unique identifier of the stock to retrieve
     * @return the {@link Stock} instance associated with the specified id
     * @throws NoSuchElementException if no stock exchange exists with the specified id
     */
    public Stock getInstance(long id)
    {
        Optional<Stock> entity = this.stockRepository.findById(id);
        return entity.orElseThrow();
    }
}
