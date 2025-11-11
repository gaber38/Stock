package com.example.Stock.Exceptions;

public class EntityAlreadyExistsException extends RuntimeException
{
    public EntityAlreadyExistsException(String message) {
        super(message);
    }
}
