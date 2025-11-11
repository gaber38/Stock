package com.example.Stock.auth.dto.Request;

import com.example.Stock.auth.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest
{
    @NotBlank
    private String firstname;
    private String lastname;

    @NotBlank
    private String email;

    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$",
            message = "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
    )
    private String password;

    @NotNull
    private Role role;
}
