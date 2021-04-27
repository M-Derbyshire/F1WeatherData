package uk.mddeveloper.F1WeatherDataStoreAPI.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Circuit;
import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Round;

public interface CircuitRepository extends JpaRepository<Circuit, Long> {
	
	/**
     * Returns the first Circuit that matches the "circuitId" (this is not to be confused
     * with the PK of the circuit table -- it's a seperate column)
     */
	public Circuit findFirstByCircuitId(String circuitId);
	
}
