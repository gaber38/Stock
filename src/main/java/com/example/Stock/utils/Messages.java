package com.example.Stock.utils;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Messages {

    SUCCESS("Operation completed successfully", "SUC000"),
    USER_NOT_FOUND("User not found", "ERR001"),
    INVALID_EMAIL("Invalid email address", "ERR002"),
    INVALID_PASSWORD("Wrong password", "ERR003"),
    PASSWORD_TOO_SHORT("Password must be at least 8 characters long", "ERR004"),
    PASSWORDS_NOT_MATCHED("Password are not the same", "ERR005"),
    SERVER_ERROR("An unexpected error occurred", "ERR006"),
    GENERAL_ERROR("Operation failed. Please try again", "ERR007"),
    ITEM_NOT_FOUND("Item not found", "ERR008"),
    DUPLICATE_ITEM("Duplicate item found", "ERR009");

    private final String message;
    private final String code;
}
