package com.example.Stock.auth.Controller;

import com.example.Stock.auth.Entity.User;
import com.example.Stock.auth.Service.AuthenticationService;
import com.example.Stock.auth.Service.LogoutService;
import com.example.Stock.auth.dto.Request.ChangePasswordRequest;
import com.example.Stock.auth.dto.Request.LoginRequest;
import com.example.Stock.auth.dto.Request.RegisterRequest;
import com.example.Stock.auth.dto.Response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("auth/")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController
{
    private final AuthenticationService authenticationService;
    private final LogoutService logoutService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, LogoutService logoutService)
    {
        this.authenticationService = authenticationService;
        this.logoutService = logoutService;
    }

    @PostMapping("register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(this.authenticationService.register(request));
    }

    @PostMapping("login")
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody LoginRequest request)
    {
        return ResponseEntity.ok(this.authenticationService.authenticate(request));
    }
}
