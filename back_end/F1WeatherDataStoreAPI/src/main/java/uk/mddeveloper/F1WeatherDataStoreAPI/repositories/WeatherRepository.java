package uk.mddeveloper.F1WeatherDataStoreAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Weather;

public interface WeatherRepository extends JpaRepository<Weather, Long> {
}
