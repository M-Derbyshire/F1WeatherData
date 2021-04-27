package uk.mddeveloper.F1WeatherDataStoreAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Circuit;
import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Country;

public interface CountryRepository extends JpaRepository<Country, Long> {
	
	/**
     * Returns the first Country that matches the given name.
     */
	public Country findFirstByName(String name);
	
}
