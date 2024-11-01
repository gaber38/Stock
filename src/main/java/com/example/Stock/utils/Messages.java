package com.example.Stock.utils;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Messages {

    USER_NOT_FOUND("User not found", "ERR001"),
    INVALID_EMAIL("Invalid email address", "ERR002"),
    PASSWORD_TOO_SHORT("Password must be at least 8 characters long", "ERR003"),
    SUCCESS("Operation completed successfully", "SUC000"),
    SERVER_ERROR("An unexpected error occurred", "ERR500"),
    GENERAL_ERROR("Operation failed. Please try again", "ERR400"),
    ITEM_NOT_FOUND("Item not found", "ERR004"),
    DUPLICATE_ITEM("Duplicate item found", "ERR005");


    private final String message;
    private final String code;



}
