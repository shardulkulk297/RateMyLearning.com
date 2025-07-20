package com.project.rateMyLearning.utility;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/*
File which is responsible for Creating Token
 */
@Component
public class JwtUtil {

    //Taking secret key

    private final static String secretKey = "myVerySecretKeyThatIsAtLeast32CharactersLong12345";



    public JwtUtil(){

    }



    //Expiration time
    private static final long expirationTimeInMills = 43200000;

    //Building Singing Key From the secret key
    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
      /*
    Create a JWT Token with:
    1. Subject = username/email
    2. Creation time: new Date().now()
    3. Expiration time: now + expirationTimeInMills
     */

    public String createToken(String username){
        return Jwts.builder().setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()
                )).setExpiration(new Date(System.currentTimeMillis()+expirationTimeInMills))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /*
    Extract the username from the token's subject
     */
    public String extractUsername(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey()).build().parseClaimsJws(token)
                .getBody().getSubject();

    }

    /*
  Verify that token matches the username and the token is not expired
   */
    public boolean verifyToken(String token, String email){
        //Extracting the subject
        String extractedEmail = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        // b) Extract “exp” from token
        Date expirationDate = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();

        // c) Check that the extracted subject equals the email we expect, and token is still valid
        return extractedEmail.equals(email)
                && new Date().before(expirationDate);
    }





}
