package com.example.Stock.Controller;

import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.Service.StockService;
import com.example.Stock.dto.Request.StockRequest;
import com.example.Stock.dto.Response.GeneralResponse;
import com.example.Stock.dto.Response.SuccessItemResponse;
import com.example.Stock.dto.Response.SuccessListResponse;
import com.example.Stock.utils.Constants;
import com.example.Stock.utils.Messages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RequestMapping(value = "stocks/")
@RestController
public class StockController
{

    private final Logger logger = Logger.getLogger(StockController.class.getName());

    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService)
    {
        this.stockService = stockService;
    }

    @GetMapping(value = "list")
    public ResponseEntity<SuccessListResponse<Stock>> list(@RequestParam(defaultValue = Constants.DEFAULT_SORTING_FIELD) String field, @RequestParam(defaultValue = Constants.ASCENDING_ORDER) String order, @RequestParam(defaultValue = Constants.DEFAULT_PAGE_NUMBER) int page)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "list", "Enter");
        List<Stock> items = this.stockService.list(field, order, page);
        SuccessListResponse<Stock> response = new SuccessListResponse<>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), items.size(), items);
        logger.logp(Level.INFO, StockController.class.getName(), "list", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "list", "Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "create")
    public ResponseEntity<SuccessItemResponse<Stock>> create(@RequestBody StockRequest request)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Enter");
        SuccessItemResponse<Stock> response = this.stockService.create(request);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Exit");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping(value = "update/{id}")
    public ResponseEntity<SuccessItemResponse<Stock>> update(@PathVariable long id, @RequestBody StockRequest request)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "update", "Enter");
        SuccessItemResponse<Stock> response = this.stockService.update(id, request);
        logger.logp(Level.INFO, StockController.class.getName(), "update", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "update", "Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<SuccessItemResponse<Stock>> delete(@PathVariable long id)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "delete", "Enter");
        SuccessItemResponse<Stock> response = this.stockService.delete(id);
        logger.logp(Level.INFO, StockController.class.getName(), "delete", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "delete", "Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
