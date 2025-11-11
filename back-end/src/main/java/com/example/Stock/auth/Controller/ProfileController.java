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
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("account/")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController
{
    private final AuthenticationService authenticationService;
    private final LogoutService logoutService;

    @Autowired
    public ProfileController(AuthenticationService authenticationService, LogoutService logoutService)
    {
        this.authenticationService = authenticationService;
        this.logoutService = logoutService;
    }

    @PostMapping("refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        this.authenticationService.refreshToken(request, response);
    }

    @PutMapping("change-password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordRequest request,
                                               @AuthenticationPrincipal User userDetails)
    {
        this.authenticationService.changePassword(request, userDetails);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
    {
        this.logoutService.logout(request, response, authentication);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
