package uk.mddeveloper.F1WeatherDataStoreAPI.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Contributer;
import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Round;

public interface ContributerRepository extends JpaRepository<Contributer, Long> {
	
	/**
     * Temporary method to provide the first (only) user in the DB
     */
	public Contributer findFirstBy();
	
	
	/**
     * Find the user by the email address
     */
	public Contributer findFirstByEmail(String email);
}
