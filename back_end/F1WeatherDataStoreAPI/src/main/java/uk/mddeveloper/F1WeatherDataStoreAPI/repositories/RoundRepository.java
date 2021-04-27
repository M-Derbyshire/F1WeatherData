package uk.mddeveloper.F1WeatherDataStoreAPI.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Round;

public interface RoundRepository extends JpaRepository<Round, Long> {
	
	/**
     * Returns the rounds that match the given Quarter, and where the
     * raceDate contains the given string
     */
	public List<Round> findByQuarterAndRaceDateContains(int quarter, String year);
}
