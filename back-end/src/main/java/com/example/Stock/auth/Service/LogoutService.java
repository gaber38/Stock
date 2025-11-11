package com.example.Stock.auth.Service;

import com.example.Stock.auth.Entity.Token;
import com.example.Stock.auth.Repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler
{
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
    {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer "))
        {
            return;
        }
        final String token = authHeader.substring(7);
        Token storedToken = tokenRepository.findByToken(token).orElse(null);
        if (storedToken != null)
        {
            jwtService.revokeAllUserTokens(storedToken.getUser());
            SecurityContextHolder.clearContext();
        }
    }
}
