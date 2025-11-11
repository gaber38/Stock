package com.example.Stock.Controller;


import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.dto.Request.AppendStockRequest;
import com.example.Stock.dto.Response.DataResponse;
import com.example.Stock.dto.Response.GeneralResponse;
import com.example.Stock.utils.Constants;
import com.example.Stock.utils.Messages;
import com.example.Stock.Service.StockExchangeService;
import com.example.Stock.dto.Request.StockExchangeRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin
@RequestMapping(value = "stockexchanges/")
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
    public ResponseEntity<DataResponse<List<StockExchange>>> list(@RequestParam(defaultValue = Constants.DEFAULT_SORTING_FIELD) String sortField,
                                                                  @RequestParam(defaultValue = Constants.ASCENDING_ORDER) String sortOrder,
                                                                  @RequestParam(defaultValue = Constants.STARTING_PAGE_INDEX) int page)
    {

        logger.info("Enter");
        List<StockExchange> stockExchanges = this.stockExchangeService.list(page, sortField, sortOrder);
        DataResponse<List<StockExchange>> response = new DataResponse<>("Success",
                Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(),
                stockExchanges.size(), stockExchanges);
        logger.info(String.format("Response: code=%s, message=%s, count=%s",
                response.getCode(), response.getMessage(), response.getCount()));
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<DataResponse<StockExchange>> retrieve(@PathVariable long id)
    {
        logger.info("Enter");
        StockExchange stockExchange = this.stockExchangeService.getStockExchange(id);
        DataResponse<StockExchange> response = new DataResponse<>("Success",
                Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(),
                1, stockExchange);
        logger.info("Response is: " + response);
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "create")
    public ResponseEntity<DataResponse<StockExchange>> create(@Valid @RequestBody StockExchangeRequest request)
    {
        logger.info("Enter");
        StockExchange stockExchange = this.stockExchangeService.create(request);
        DataResponse<StockExchange> response = new DataResponse<>("Success",
                Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(),
                1, stockExchange);
        logger.info("Response is: " + response);
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping(value = "update/{id}")
    public ResponseEntity<GeneralResponse> update(@PathVariable long id, @Valid @RequestBody StockExchangeRequest request)
    {
        logger.info("Enter");
        this.stockExchangeService.update(id, request);
        GeneralResponse response = GeneralResponse.builder().status("Success")
                .code(Messages.SUCCESS.getCode())
                .message(Messages.SUCCESS.getMessage()).build();
        logger.info("Response is: " + response);
        logger.info("Exit");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<GeneralResponse> delete(@PathVariable long id)
    {
        logger.info("Enter");
        this.stockExchangeService.delete(id);
        GeneralResponse response = GeneralResponse.builder().status("Success")
                .code(Messages.SUCCESS.getCode())
                .message(Messages.SUCCESS.getMessage()).build();
        logger.info("Response is: " + response);
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "add_stock/{id}")
    public ResponseEntity<GeneralResponse> add_stock(@PathVariable long id, @Valid @RequestBody AppendStockRequest request)
    {
        logger.info("Enter");
        this.stockExchangeService.add_stock(id, request.getStockId());
        GeneralResponse response = GeneralResponse.builder().status("Success")
                .code(Messages.SUCCESS.getCode())
                .message(Messages.SUCCESS.getMessage()).build();
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "remove_stock/{id}")
    public ResponseEntity<GeneralResponse> remove_stock(@PathVariable long id, @Valid @RequestBody AppendStockRequest request)
    {
        logger.logp(Level.INFO, StockExchangeService.class.getName(), "create", "Enter");
        this.stockExchangeService.remove_stock(id, request.getStockId());
        GeneralResponse response = GeneralResponse.builder().status("Success")
                .code(Messages.SUCCESS.getCode())
                .message(Messages.SUCCESS.getMessage()).build();
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
