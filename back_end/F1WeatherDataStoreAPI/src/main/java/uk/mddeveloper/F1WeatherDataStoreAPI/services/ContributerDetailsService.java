package uk.mddeveloper.F1WeatherDataStoreAPI.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Contributer;
import uk.mddeveloper.F1WeatherDataStoreAPI.repositories.ContributerRepository;

import java.util.ArrayList;

public class ContributerDetailsService implements UserDetailsService {

	ContributerRepository contributerRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		Contributer cont = contributerRepo.findFirstByEmail(email);
		
		return new User(cont.getEmail(), cont.getPassword(), new ArrayList<>());
	}

}
