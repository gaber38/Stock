package com.example.Stock.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Messages {

    SUCCESS("Operation completed successfully", "SUC000"),
    LOGIN_FAILED("Login failed. Please check your username and password and try again.", "ERR001"),
    INVALID_PASSWORD("Wrong password", "ERR002"),
    PASSWORDS_NOT_MATCHED("Password are not the same", "ERR003"),
    GENERAL_ERROR("Operation failed. Please try again", "ERR004"),
    ITEM_NOT_FOUND("Item not found", "ERR005"),
    DATA_INTEGRITY_VIOLATION("Data integrity violation occurred", "ERR006"),
    INVALID_ARGUMENT("Invalid argument provided", "ERR007");

    private final String message;
    private final String code;
}
