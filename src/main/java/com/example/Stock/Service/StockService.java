package com.example.Stock.Service;

import com.example.Stock.Controller.StockController;
import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.Exceptions.InValidArgumentException;
import com.example.Stock.Repository.StockRepository;
import com.example.Stock.dto.Request.StockRequest;
import com.example.Stock.dto.Response.ErrorResponse;
import com.example.Stock.dto.Response.GeneralResponse;
import com.example.Stock.dto.Response.SuccessItemResponse;
import com.example.Stock.dto.Response.SuccessListResponse;
import com.example.Stock.utils.Constants;
import com.example.Stock.utils.Messages;
import com.example.Stock.utils.ObjectValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

    @Autowired
    public StockService(StockRepository stockRepository, ObjectValidator<Stock> validator)
    {
        this.stockRepository = stockRepository;
        this.validator = validator;
    }

    public List<Stock> list(String field, String order, int pageNumber)
    {
        logger.logp(Level.INFO, StockService.class.getName(), "list", "Enter");
        Sort sort = Sort.by(field).ascending();
        if (order.equalsIgnoreCase(Constants.DESCENDING_ORDER))
        {
            sort = Sort.by(field).descending();
        }
        logger.logp(Level.INFO, StockService.class.getName(), "list",
                String.format("Parameters: field=%s, order=%s, pageNumber=%d", field, order, pageNumber));
        Pageable pageable = PageRequest.of(pageNumber - 1, Constants.DEFAULT_PAGE_SIZE, sort);
        Page<Stock> page = this.stockRepository.findAll(pageable);
        logger.logp(Level.INFO, StockService.class.getName(), "list",
                String.format("Number of stocks retrieved: %d", page.getTotalElements()));
        logger.logp(Level.INFO, StockService.class.getName(), "list", "Exit");
        return page.getContent();
    }

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

    public SuccessItemResponse<Stock> delete(long id)
    {
        logger.logp(Level.INFO, StockService.class.getName(), "delete", "Enter");
        logger.logp(Level.INFO, StockService.class.getName(), "delete", String.format("Item Id is: %s", id));
        Stock item = this.getInstance(id);
        this.stockRepository.delete(item);
        logger.logp(Level.INFO, StockService.class.getName(), "delete", "Exit");
        return new SuccessItemResponse<Stock>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 0, null);
    }

    public Stock getInstance(long id)
    {
        Optional<Stock> entity = this.stockRepository.findById(id);
        return entity.orElseThrow();
    }
}
