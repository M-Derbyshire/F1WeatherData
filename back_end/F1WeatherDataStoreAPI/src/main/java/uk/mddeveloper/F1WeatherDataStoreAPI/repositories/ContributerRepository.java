package uk.mddeveloper.F1WeatherDataStoreAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Contributer;

public interface ContributerRepository extends JpaRepository<Contributer, Long> {
}
