package uk.mddeveloper.F1WeatherDataStoreAPI.Models.auth;

public class AuthResponse {
	
	private final String jwt;
	
	public AuthResponse(String jwt)
	{
		this.jwt = jwt;
	}
	
	public String getJwt()
	{
		return jwt;
	}
	
}
