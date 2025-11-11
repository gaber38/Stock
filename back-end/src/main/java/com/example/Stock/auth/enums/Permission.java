package com.example.Stock.auth.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {

    READ("read"),
    UPDATE("update"),
    CREATE("create"),
    DELETE("delete");

    private final String permission;
}
