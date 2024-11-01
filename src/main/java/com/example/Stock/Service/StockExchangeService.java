package com.example.Stock.Service;

import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.Exceptions.InValidArgumentException;
import com.example.Stock.Repository.StockExchangeRepository;
import com.example.Stock.dto.Request.StockExchangeRequest;
import com.example.Stock.dto.Response.SuccessItemResponse;
import com.example.Stock.utils.Constants;
import com.example.Stock.utils.Messages;
import com.example.Stock.utils.ObjectValidator;

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

    public List<StockExchange> list(String field, String order, int pageNumber)
    {
        Sort sort = Sort.by(field).ascending();
        if (order.equalsIgnoreCase(Constants.DESCENDING_ORDER))
        {
            sort = Sort.by(field).descending();
        }
        Pageable pageable = PageRequest.of(pageNumber - 1, Constants.DEFAULT_PAGE_SIZE, sort);
        Page<StockExchange> page = this.stockExchangeRepository.findAllByLiveInMarket(pageable, true);
        return page.getContent();
    }

    public SuccessItemResponse<StockExchange> create(StockExchangeRequest request)
    {
        StockExchange item = new StockExchange(request.getName(), request.getDescription(), false);

        Map<String, String> errors = validator.validate(item);
        if (!errors.isEmpty())
        {
            throw new InValidArgumentException(errors);
        }
        item = this.stockExchangeRepository.save(item);
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }

    public SuccessItemResponse<StockExchange> update(long id, StockExchangeRequest request)
    {
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
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }

    public SuccessItemResponse<StockExchange> delete(long id)
    {
        StockExchange item = this.getInstance(id);
        this.stockExchangeRepository.delete(item);
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 0, null);
    }

    public SuccessItemResponse<StockExchange> add_stock(long id, long stockId)
    {
        StockExchange item = this.getInstance(id);
        Stock stock = this.stockService.getInstance(stockId);
        item.addStock(stock);
        if (item.getStocks().size() >= 10)
        {
            item.setLiveInMarket(true);
        }
        this.stockExchangeRepository.save(item);
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }

    public SuccessItemResponse<StockExchange> remove_stock(long id, long stockId)
    {
        StockExchange item = this.getInstance(id);
        Stock stock = this.stockService.getInstance(stockId);
        item.removeStock(stock);
        if (item.getStocks().size() < 10)
        {
            item.setLiveInMarket(false);
        }
        this.stockExchangeRepository.save(item);
        return new SuccessItemResponse<StockExchange>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }

    public StockExchange getInstance(long id)
    {
        Optional<StockExchange> entity = this.stockExchangeRepository.findById(id);
        return entity.orElseThrow();
    }
}
