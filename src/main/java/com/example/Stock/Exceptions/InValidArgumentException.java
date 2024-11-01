package com.example.Stock.Exceptions;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class InValidArgumentException extends IllegalArgumentException
{
    Map<String, String> errors;

    public InValidArgumentException(String message, Map<String, String> errors)
    {
        super(message);
        this.errors = errors;
    }

    public InValidArgumentException(Map<String, String> errors)
    {
        super("In Valid Data");
        this.errors = errors;
    }
}
