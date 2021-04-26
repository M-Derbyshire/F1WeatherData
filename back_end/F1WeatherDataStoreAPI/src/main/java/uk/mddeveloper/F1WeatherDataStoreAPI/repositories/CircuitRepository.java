package uk.mddeveloper.F1WeatherDataStoreAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Circuit;

public interface CircuitRepository extends JpaRepository<Circuit, Long> {
}
