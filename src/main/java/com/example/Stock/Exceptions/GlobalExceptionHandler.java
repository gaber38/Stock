package com.example.Stock.Exceptions;


import com.example.Stock.Service.StockExchangeService;
import com.example.Stock.dto.Response.ErrorResponse;
import com.example.Stock.utils.Messages;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.NoSuchElementException;
import java.util.logging.Level;
import java.util.logging.Logger;

@ControllerAdvice
public class GlobalExceptionHandler
{
    private final Logger logger = Logger.getLogger(GlobalExceptionHandler.class.getName());

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException e)
    {
        logger.logp(Level.SEVERE, GlobalExceptionHandler.class.getName(), "handleDataIntegrityViolationException",
                "Data integrity violation occurred", e);
        ErrorResponse response = new ErrorResponse(Messages.GENERAL_ERROR.getMessage(),
                Messages.GENERAL_ERROR.getCode(),
                Collections.singletonMap("detailed_message", e.getMessage()));

        logger.logp(Level.INFO, GlobalExceptionHandler.class.getName(), "handleDataIntegrityViolationException",
                String.format("Returning error response: %s", response));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InValidArgumentException.class)
    public ResponseEntity<ErrorResponse> handleInValidArgumentException(InValidArgumentException e)
    {
        logger.logp(Level.SEVERE, GlobalExceptionHandler.class.getName(), "handleInValidArgumentException",
                "Data integrity violation occurred", e);
        ErrorResponse response = new ErrorResponse(Messages.GENERAL_ERROR.getMessage(),
                Messages.GENERAL_ERROR.getCode(), e.getErrors());

        logger.logp(Level.INFO, GlobalExceptionHandler.class.getName(), "handleInValidArgumentException",
                String.format("Returning error response: %s", response));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNoSuchElementException(NoSuchElementException e)
    {
        logger.logp(Level.SEVERE, GlobalExceptionHandler.class.getName(), "handleNoSuchElementException",
                "Data integrity violation occurred", e);
        ErrorResponse response = new ErrorResponse(Messages.ITEM_NOT_FOUND.getMessage(), Messages.ITEM_NOT_FOUND.getCode(),
                Collections.singletonMap("detailed_message", e.getMessage()));

        logger.logp(Level.INFO, GlobalExceptionHandler.class.getName(), "handleNoSuchElementException",
                String.format("Returning error response: %s", response));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception e)
    {
        logger.logp(Level.SEVERE, GlobalExceptionHandler.class.getName(), "handleGeneralException",
                "Data integrity violation occurred", e);
        ErrorResponse response = new ErrorResponse(Messages.GENERAL_ERROR.getMessage(), Messages.GENERAL_ERROR.getCode(),
                Collections.singletonMap("detailed_message", e.getMessage()));
        logger.logp(Level.INFO, GlobalExceptionHandler.class.getName(), "handleGeneralException",
                String.format("Returning error response: %s", response));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
