package uk.mddeveloper.F1WeatherDataStoreAPI.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

//A certain amount of this implementation was taken from articles/tutorials
//But if you can't nab some code of the internet (with modification, and understanding it, of course)
//Then are you a real developer?

@Service
public class JwtUtil {
	
	@Autowired
	private Environment env;
	
	private String SIGNING_KEY = env.getProperty("jwt-signing-key");
	
	private Date getTokenExpirationDate()
	{
		return new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10);
	}
	
	
	private Claims extractAllClaims(String token)
	{
		return Jwts.parser().setSigningKey(SIGNING_KEY).parseClaimsJws(token).getBody();
	}
	
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver)
	{
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	
	
	public String extractUsername(String token)
	{
		return extractClaim(token, Claims::getSubject);
	}
	
	public Date extractExpiration(String token)
	{
		return extractClaim(token, Claims::getExpiration);
	}
	
	private Boolean isTokenExpired(String token)
	{
		return extractExpiration(token).before(new Date());
	}
	
	public String generateToken(UserDetails userDetails)
	{
		Map<String, Object> claims = new HashMap<>(); //Just going to leave this empty, as we don't need any right now
		return createToken(claims, userDetails.getUsername());
	}
	
	private String createToken(Map<String, Object> claims, String subjectUsername)
	{
		return Jwts.builder().setClaims(claims)
			.setSubject(subjectUsername) // The username that has authenticated
			.setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(getTokenExpirationDate())
			.signWith(SignatureAlgorithm.HS256, SIGNING_KEY)
			.compact();
	}
	
	public Boolean validateToken(String token, UserDetails userDetails)
	{
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	
	
}
