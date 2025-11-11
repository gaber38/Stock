package com.example.Stock.Controller;

import com.example.Stock.Entity.Stock;
import com.example.Stock.Entity.StockExchange;
import com.example.Stock.Service.StockService;
import com.example.Stock.dto.Request.StockRequest;
import com.example.Stock.dto.Response.DataResponse;
import com.example.Stock.dto.Response.GeneralResponse;
import com.example.Stock.utils.Constants;
import com.example.Stock.utils.Messages;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "stocks/")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StockController
{
    private final Logger logger = LoggerFactory.getLogger(StockExchange.class);

    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService)
    {
        this.stockService = stockService;
    }

    @GetMapping(value = "list")
    public ResponseEntity<DataResponse<List<Stock>>> list(@RequestParam(defaultValue = Constants.DEFAULT_SORTING_FIELD) String sortField,
                                                          @RequestParam(defaultValue = Constants.ASCENDING_ORDER) String sortOrder,
                                                          @RequestParam(defaultValue = Constants.STARTING_PAGE_INDEX) int page)
    {
        logger.info("Enter");
        List<Stock> items = this.stockService.list(page, sortField, sortOrder);
        DataResponse<List<Stock>> response = new DataResponse<>("Success",
                Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(),
                items.size(), items);
        logger.info("Response: code={}, message={}, count={}",
                response.getCode(), response.getMessage(), response.getCount());
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<DataResponse<Stock>> retrieve(@PathVariable long id)
    {
        logger.info("Enter");
        Stock item = this.stockService.getStock(id);
        DataResponse<Stock> response = new DataResponse<>("Success",
                Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(),
                1, item);
        logger.info("Response is : {}", response);
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping(value = "create")
    public ResponseEntity<DataResponse<Stock>> create(@Valid @RequestBody StockRequest request)
    {
        logger.info("Enter");
        Stock item = this.stockService.create(request);
        DataResponse<Stock> response = new DataResponse<>("Success",
                Messages.SUCCESS.getCode(), Messages.SUCCESS.getMessage(),
                1, item);
        logger.info("Response is : {}", response);
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping(value = "update/{id}")
    public ResponseEntity<GeneralResponse> update(@PathVariable long id, @RequestBody StockRequest request)
    {
        logger.info("Enter");
        this.stockService.update(id, request);
        GeneralResponse response = GeneralResponse.builder().status("Success")
                .code(Messages.SUCCESS.getCode())
                .message(Messages.SUCCESS.getMessage()).build();
        logger.info("Response is : {}", response);
        logger.info("Exit");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<GeneralResponse> delete(@PathVariable long id)
    {
        logger.info("Enter");
        this.stockService.delete(id);
        GeneralResponse response = GeneralResponse.builder().status("Success")
                .code(Messages.SUCCESS.getCode())
                .message(Messages.SUCCESS.getMessage()).build();
        logger.info("Response is : {}", response);
        logger.info("Exit");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
