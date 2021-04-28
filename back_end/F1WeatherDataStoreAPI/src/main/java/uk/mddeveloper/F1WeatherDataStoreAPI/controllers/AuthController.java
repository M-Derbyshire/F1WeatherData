package uk.mddeveloper.F1WeatherDataStoreAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.auth.AuthRequest;
import uk.mddeveloper.F1WeatherDataStoreAPI.Models.auth.AuthResponse;
import uk.mddeveloper.F1WeatherDataStoreAPI.services.ContributerDetailsService;
import uk.mddeveloper.F1WeatherDataStoreAPI.utils.JwtUtil;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private ContributerDetailsService userDetailsService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping(path = "", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest) throws Exception 
	{
		String jwt;
		
		try
		{
			authManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
			final UserDetails user = userDetailsService.loadUserByUsername(authRequest.getUsername());
			jwt = jwtUtil.generateToken(user);
		}
		catch (BadCredentialsException e)
		{
			throw new Exception("Incorrect username and/or password", e);
		}
		catch (AuthenticationException e)
		{
			throw new Exception("Error while authenticating user: ", e);
		}
		catch (Exception e)
		{
			throw new Exception("Error during authentication process: ", e);
		}
		
		return ResponseEntity.ok(new AuthResponse(jwt));
	}
	
}
