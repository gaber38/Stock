package com.example.Stock.Exceptions;

import com.example.Stock.dto.Response.ErrorResponse;
import com.example.Stock.utils.Messages;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler
{
    private final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException e)
    {
        logger.info("DataIntegrityViolationException occurred: {}", e.getMessage());
        ErrorResponse response = new ErrorResponse("Error", Messages.DATA_INTEGRITY_VIOLATION.getCode(),
                Messages.DATA_INTEGRITY_VIOLATION.getMessage(), Collections.singletonMap("detailed message", parseDatabaseError(e.getMostSpecificCause().getMessage())));
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e)
    {
        Map<String, String> errors = e.getBindingResult().getFieldErrors().stream().collect(Collectors.toMap(
                FieldError::getField,
                fieldError -> fieldError.getDefaultMessage() != null ? fieldError.getDefaultMessage() : "inValid value"
        ));
        ErrorResponse response = new ErrorResponse("Error", Messages.INVALID_ARGUMENT.getCode(),
                Messages.INVALID_ARGUMENT.getMessage(), errors);

        logger.info("MethodArgumentNotValidException occurred: {}", errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNoSuchElementException(NoSuchElementException e)
    {
        logger.info("NoSuchElementException occurred: {}", e.getMessage());
        ErrorResponse response = new ErrorResponse("Error", Messages.ITEM_NOT_FOUND.getCode(),
                Messages.ITEM_NOT_FOUND.getMessage(), Collections.singletonMap("detailed_message", e.getMessage()));
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException e)
    {
        logger.info("AuthenticationException occurred: {}", e.getMessage());
        ErrorResponse response = new ErrorResponse("Error", Messages.LOGIN_FAILED.getCode(), Messages.LOGIN_FAILED.getMessage(),
                Collections.singletonMap("detailed_message", e.getMessage()));
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception e)
    {
        logger.info("GeneralException occurred: {}", e.getMessage());
        ErrorResponse response = new ErrorResponse("Error", Messages.GENERAL_ERROR.getCode(), Messages.GENERAL_ERROR.getMessage(),
                Collections.singletonMap("detailed_message", e.getMessage()));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


    private String parseDatabaseError(String dbMessage) {
        if (dbMessage == null) return "Database error";

        // 1. Unique constraint violation
        Pattern uniquePattern = Pattern.compile("\\((.*?)\\)=\\((.*?)\\)");
        Matcher uniqueMatcher = uniquePattern.matcher(dbMessage);
        if (dbMessage.toLowerCase().contains("duplicate key") && uniqueMatcher.find()) {
            String column = uniqueMatcher.group(1);
            return capitalize(column) + " already exists";
        }

        // 2. Not-null constraint violation
        Pattern notNullPattern = Pattern.compile("null value in column \"(.*?)\"");
        Matcher notNullMatcher = notNullPattern.matcher(dbMessage);
        if (dbMessage.toLowerCase().contains("not-null") && notNullMatcher.find()) {
            String column = notNullMatcher.group(1);
            return capitalize(column) + " cannot be null";
        }

        // 3. Check constraint violation
        Pattern checkPattern = Pattern.compile("violates check constraint \"(.*?)\"");
        Matcher checkMatcher = checkPattern.matcher(dbMessage);
        if (dbMessage.toLowerCase().contains("check constraint") && checkMatcher.find()) {
            String constraintName = checkMatcher.group(1);
            return "Constraint violation: " + constraintName;
        }

        // 4. Foreign key violation
        Pattern fkPattern = Pattern.compile("violates foreign key constraint \"(.*?)\"");
        Matcher fkMatcher = fkPattern.matcher(dbMessage);
        if (dbMessage.toLowerCase().contains("foreign key") && fkMatcher.find()) {
            String constraintName = fkMatcher.group(1);
            return "Invalid reference, violates " + constraintName;
        }

        // Default fallback
        return "Database error";
    }

    // Helper
    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
