package com.example.Stock.utils;


import jakarta.validation.*;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ObjectValidator<T> {

    private final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();

    private final Validator validator = factory.getValidator();

    public Map<String, String> validate(T obj)
    {
        Set<ConstraintViolation<T>> violations = validator.validate(obj);

        if(!violations.isEmpty())
        {
             return violations.stream()
                    .collect(Collectors.toMap(
                            error-> error.getPropertyPath().toString(),
                            ConstraintViolation::getMessage
                    ));
        }
        return Collections.emptyMap();
    }
}
