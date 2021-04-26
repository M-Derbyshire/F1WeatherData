package uk.mddeveloper.F1WeatherDataStoreAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Round;

public interface RoundRepository extends JpaRepository<Round, Long> {
}
