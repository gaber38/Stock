package com.example.Stock.auth.Service;

import com.example.Stock.auth.Entity.Token;
import com.example.Stock.auth.Entity.User;
import com.example.Stock.auth.Repository.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService
{
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    @Autowired
    private TokenRepository tokenRepository;

    public String generateToken(UserDetails userDetails)
    {
        return buildToken(userDetails, jwtExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails)
    {
        return buildToken(userDetails, refreshExpiration);
    }

    private String buildToken(UserDetails userDetails, long expiration)
    {
        Map<String, Object> extraClaims = new HashMap<>();
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails)
    {
        if(tokenRepository.findByToken(token).isPresent())
        {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername())) && !extractExpiration(token).before(new Date());
        }
        return false;
    }

    private Claims extractAllClaims(String token)
    {
        return Jwts.parser().
                setSigningKey(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractUsername(String token)
    {
        final Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    private Date extractExpiration(String token)
    {
        final Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }

    public void revokeAllUserTokens(User user)
    {
        List<Token> validUserTokens = tokenRepository.findAllByUserId(user.getId());
        tokenRepository.deleteAll(validUserTokens);
    }

    private Key getSignInKey()
    {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
