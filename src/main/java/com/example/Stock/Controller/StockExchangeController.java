package com.example.Stock.Controller;

import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.dto.Request.AppendStockRequest;
import com.example.Stock.dto.Response.SuccessItemResponse;
import com.example.Stock.dto.Response.SuccessListResponse;
import com.example.Stock.utils.Constants;
import com.example.Stock.utils.Messages;
import com.example.Stock.Service.StockExchangeService;
import com.example.Stock.dto.Request.StockExchangeRequest;
import com.example.Stock.dto.Response.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RequestMapping(value = "stockexchange/")
@RestController
public class StockExchangeController
{
    private final Logger logger = Logger.getLogger(StockExchangeController.class.getName());

    private final StockExchangeService stockExchangeService;

    @Autowired
    public StockExchangeController(StockExchangeService stockExchangeService)
    {
        this.stockExchangeService = stockExchangeService;
    }

    @GetMapping(value = "list")
    public ResponseEntity<SuccessListResponse<StockExchange>> list(@RequestParam(defaultValue = Constants.DEFAULT_SORTING_FIELD) String field, @RequestParam(defaultValue = Constants.ASCENDING_ORDER) String order, @RequestParam(defaultValue = Constants.DEFAULT_PAGE_NUMBER) int page)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Enter");
        List<StockExchange> stockExchanges = this.stockExchangeService.list(field, order, page);
        SuccessListResponse<StockExchange> response = new SuccessListResponse<>(Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(), stockExchanges.size(), stockExchanges);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "create")
    public ResponseEntity<SuccessItemResponse<StockExchange>> create(@RequestBody StockExchangeRequest request)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Enter");
        SuccessItemResponse<StockExchange> response = this.stockExchangeService.create(request);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Exit");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping(value = "update/{id}")
    public ResponseEntity<SuccessItemResponse<StockExchange>> update(@PathVariable long id, @RequestBody StockExchangeRequest request)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Enter");
        SuccessItemResponse<StockExchange> response = this.stockExchangeService.update(id, request);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<SuccessItemResponse<StockExchange>> delete(@PathVariable long id)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Enter");
        SuccessItemResponse<StockExchange> response = this.stockExchangeService.delete(id);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "add_stock/{id}")
    public ResponseEntity<SuccessItemResponse<StockExchange>> add_stock(@PathVariable long id, @RequestBody AppendStockRequest request)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Enter");
        SuccessItemResponse<StockExchange> response = this.stockExchangeService.add_stock(id, request.getStockId());
        logger.logp(Level.INFO, StockController.class.getName(), "create", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "remove_stock/{id}")
    public ResponseEntity<SuccessItemResponse<StockExchange>> remove_stock(@PathVariable long id, @RequestBody AppendStockRequest request)
    {
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Enter");
        SuccessItemResponse<StockExchange> response = this.stockExchangeService.remove_stock(id, request.getStockId());
        logger.logp(Level.INFO, StockController.class.getName(), "create", "response is " + response);
        logger.logp(Level.INFO, StockController.class.getName(), "create", "Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
