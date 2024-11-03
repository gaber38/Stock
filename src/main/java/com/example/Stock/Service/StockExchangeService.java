package com.example.Stock.Service;

import com.example.Stock.Controller.StockController;
import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.Exceptions.EntityAlreadyExistsException;
import com.example.Stock.Exceptions.InValidArgumentException;
import com.example.Stock.Repository.StockExchangeRepository;
import com.example.Stock.dto.Request.StockExchangeRequest;
import com.example.Stock.dto.Response.SuccessItemResponse;
import com.example.Stock.utils.Constants;
import com.example.Stock.utils.Messages;
import com.example.Stock.utils.ObjectValidator;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class StockExchangeService
{
    private final Logger logger = Logger.getLogger(StockExchangeService.class.getName());

    private final StockExchangeRepository stockExchangeRepository;
    private final ObjectValidator<StockExchange> validator;
    private final StockService stockService;

    @Autowired
    public StockExchangeService(StockExchangeRepository stockExchangeRepository, ObjectValidator<StockExchange> validator, StockService stockService)
    {
        this.stockExchangeRepository = stockExchangeRepository;
        this.validator = validator;
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
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "list", "Enter");
        Sort sort = Sort.by(sortField).ascending();
        if (sortOrder.equalsIgnoreCase(Constants.DESCENDING_ORDER))
        {
            sort = Sort.by(sortField).descending();
        }
        pageNumber = (pageNumber < 1) ? 0 : (pageNumber - 1);     // Page 1 (0 index)
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "list",
                String.format("Parameters: field=%s, order=%s, pageNumber=%d", sortField, sortOrder, pageNumber));
        Pageable pageable = PageRequest.of(pageNumber, Constants.DEFAULT_PAGE_SIZE, sort);
        Page<StockExchange> page = this.stockExchangeRepository.findAll(pageable);
        if (page.isEmpty() && pageNumber != 0) {
            pageable = PageRequest.of(0, Constants.DEFAULT_PAGE_SIZE);
            page = this.stockExchangeRepository.findAll(pageable);
        }
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "list",
                String.format("Number of stocks retrieved: %d", page.getTotalElements()));
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "list", "Exit");
        return page.getContent();
    }


    /**
     * Retrieves a stock exchange by its unique identifier.
     *
     * @param id the unique identifier of the stock exchange to retrieve
     * @return a {@link SuccessItemResponse} containing the {@link StockExchange} instance associated with the specified id
     * @throws NoSuchElementException if no stock exchange exists with the specified id
     */
    public SuccessItemResponse<StockExchange> retrieve(long id)
    {
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "retrieve", "Enter");
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "retrieve", String.format("retrieving Item with Id = %s", id));
        StockExchange item = this.getInstance(id);
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "retrieve", "Exit");
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }

    /**
     * Creates a new stock exchange based on the provided request data.
     *
     * @param request the {@link StockExchangeRequest} containing the details of the stock exchange to create
     * @return a {@link SuccessItemResponse} containing the created {@link StockExchange} instance
     * @throws InValidArgumentException if no stock exchange exists with the specified id
     */
    public SuccessItemResponse<StockExchange> create(StockExchangeRequest request)
    {
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "create", "Enter");
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "create",
                String.format("Incoming Request is: %s", request));
        StockExchange item = new StockExchange(request.getName(), request.getDescription(), false);

        Map<String, String> errors = validator.validate(item);
        if (!errors.isEmpty())
        {
            throw new InValidArgumentException(errors);
        }
        item = this.stockExchangeRepository.save(item);
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "create",
                String.format("Stock item created: %s", item));
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "create", "Exit");
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }


    /**
     * Updates an existing stock exchange with the provided request data.
     *
     * @param id      the unique identifier of the stock exchange to update
     * @param request the {@link StockExchangeRequest} containing the updated details of the stock exchange
     * @return a {@link SuccessItemResponse} containing the updated {@link StockExchange} instance
     * @throws NoSuchElementException if no stock exchange exists with the specified id
     * @throws InValidArgumentException if no stock exchange exists with the specified id
     */
    public SuccessItemResponse<StockExchange> update(long id, StockExchangeRequest request)
    {
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "update", "Enter");
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "update",
                String.format("Incoming Request is: %s", request));
        StockExchange item = this.getInstance(id);
        if (request.getName() != null)
        {
            item.setName(request.getName());
        }
        if (request.getDescription() != null)
        {
            item.setDescription(request.getDescription());
        }
        Map<String, String> errors = validator.validate(item);
        if (!errors.isEmpty())
        {
            throw new InValidArgumentException(errors);
        }
        item = this.stockExchangeRepository.save(item);
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "update", "Exit");
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "update",
                String.format("Stock item updated: %s", item));
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }


    /**
     * Deletes a stock exchange by its unique identifier.
     *
     * @param id the unique identifier of the stock exchange to delete
     * @return a {@link SuccessItemResponse} indicating the result of the deletion operation
     * @throws NoSuchElementException if no stock exchange exists with the specified id
     */
    @Transactional
    public SuccessItemResponse<StockExchange> delete(long id)
    {
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "delete", "Enter");
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "delete", String.format("Item Id is: %s", id));
        StockExchange item = this.getInstance(id);
        this.stockExchangeRepository.deleteRelated(id);
        this.stockExchangeRepository.delete(item);
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "delete", "Exit");
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 0, null);
    }


    /**
     * Adds a stock to the specified stock exchange.
     *
     * @param id      the unique identifier of the stock exchange to which the stock will be added
     * @param stockId the unique identifier of the stock to add
     * @return a {@link SuccessItemResponse} containing the updated {@link StockExchange} instance
     * @throws EntityAlreadyExistsException if stock exchange already contains this stock
     */
    public SuccessItemResponse<StockExchange> add_stock(long id, long stockId)
    {
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "add_stock", "Enter");
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "add_stock",
                String.format("Stock_id %s is to be added to StockExchange %s", id, stockId));
        StockExchange item = this.getInstance(id);
        Stock stock = this.stockService.getInstance(stockId);
        item.addStock(stock);
        this.stockExchangeRepository.save(item);
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "add_stock", "Exit");
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }


    /**
     * Removes a stock from the specified stock exchange.
     *
     * @param id      the unique identifier of the stock exchange from which the stock will be removed
     * @param stockId the unique identifier of the stock to remove
     * @return a {@link SuccessItemResponse} containing the updated {@link StockExchange} instance
     * @throws NoSuchElementException if no stock exists with the specified id
     */
    public SuccessItemResponse<StockExchange> remove_stock(long id, long stockId)
    {
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "remove_stock", "Enter");
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "remove_stock",
                String.format("Stock_id %s is to be removed from StockExchange %s", id, stockId));
        StockExchange item = this.getInstance(id);
        Stock stock = this.stockService.getInstance(stockId);
        item.removeStock(stock);
        this.stockExchangeRepository.save(item);
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "remove_stock", "Exit");
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }


    /**
     * Retrieves a stock exchange instance by its unique identifier.
     *
     * @param id the unique identifier of the stock exchange to retrieve
     * @return the {@link StockExchange} instance associated with the specified id
     * @throws NoSuchElementException if no stock exchange exists with the specified id
     */
    public StockExchange getInstance(long id)
    {
        Optional<StockExchange> entity = this.stockExchangeRepository.findById(id);
        return entity.orElseThrow();
    }
}
