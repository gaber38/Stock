package com.example.Stock.Exceptions;


import com.example.Stock.dto.Response.ErrorResponse;
import com.example.Stock.utils.Messages;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandler
{
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException e)
    {
        ErrorResponse response = new ErrorResponse(Messages.GENERAL_ERROR.getMessage(),
                Messages.GENERAL_ERROR.getCode(),
                Collections.singletonMap("detailed_message", e.getMessage()));

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InValidArgumentException.class)
    public ResponseEntity<ErrorResponse> handleInValidArgumentException(InValidArgumentException e)
    {
        ErrorResponse response = new ErrorResponse(Messages.GENERAL_ERROR.getMessage(),
                Messages.GENERAL_ERROR.getCode(), e.getErrors());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNoSuchElementException(NoSuchElementException e)
    {
        ErrorResponse response = new ErrorResponse(Messages.ITEM_NOT_FOUND.getMessage(), Messages.ITEM_NOT_FOUND.getCode(),
                Collections.singletonMap("detailed_message", e.getMessage()));

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception e)
    {
        ErrorResponse response = new ErrorResponse(Messages.GENERAL_ERROR.getMessage(), Messages.GENERAL_ERROR.getCode(),
                Collections.singletonMap("detailed_message", e.getMessage()));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
