package com.example.Stock.Service;

import com.example.Stock.Entity.Stock;
import com.example.Stock.Exceptions.InValidArgumentException;
import com.example.Stock.Repository.StockRepository;
import com.example.Stock.dto.Request.StockRequest;
import com.example.Stock.dto.Response.ErrorResponse;
import com.example.Stock.dto.Response.GeneralResponse;
import com.example.Stock.dto.Response.SuccessItemResponse;
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

@Service
public class StockService
{

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
        Sort sort = Sort.by(field).ascending();
        if (order.equalsIgnoreCase(Constants.DESCENDING_ORDER))
        {
            sort = Sort.by(field).descending();
        }
        Pageable pageable = PageRequest.of(pageNumber - 1, Constants.DEFAULT_PAGE_SIZE, sort);
        Page<Stock> page = this.stockRepository.findAll(pageable);
        return page.getContent();
    }

    public SuccessItemResponse<Stock> create(StockRequest request)
    {
        Stock item = new Stock(request.getName(), request.getDescription(), request.getCurrentPrice());

        Map<String, String> errors = validator.validate(item);
        if (!errors.isEmpty())
        {
            throw new InValidArgumentException(errors);
        }
        item = this.stockRepository.save(item);
        return new SuccessItemResponse<Stock>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }


    public SuccessItemResponse<Stock> update(long id, StockRequest request)
    {
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
        return new SuccessItemResponse<Stock>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 1, item);
    }

    public SuccessItemResponse<Stock> delete(long id)
    {
        Stock item = this.getInstance(id);
        this.stockRepository.delete(item);
        return new SuccessItemResponse<Stock>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), 0, null);
    }

    public Stock getInstance(long id)
    {
        Optional<Stock> entity = this.stockRepository.findById(id);
        return entity.orElseThrow();
    }
}
