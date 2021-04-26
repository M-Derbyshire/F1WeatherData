package uk.mddeveloper.F1WeatherDataStoreAPI.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Round;
import uk.mddeveloper.F1WeatherDataStoreAPI.repositories.CircuitRepository;
import uk.mddeveloper.F1WeatherDataStoreAPI.repositories.ContributerRepository;
import uk.mddeveloper.F1WeatherDataStoreAPI.repositories.CountryRepository;
import uk.mddeveloper.F1WeatherDataStoreAPI.repositories.RoundRepository;
import uk.mddeveloper.F1WeatherDataStoreAPI.repositories.WeatherRepository;

@RestController
@RequestMapping("/api/v1")
public class RoundDataController {
	
	@Autowired
	private CircuitRepository circuitRepo;
	
	@Autowired
	private ContributerRepository contributorRepo;
	
	@Autowired
	private CountryRepository countryRepo;
	
	@Autowired
	private RoundRepository roundRepo;
	
	@Autowired
	private WeatherRepository weatherRepo;
	
	
	@GetMapping
	public List<Round> list()
	{
		return roundRepo.findAll();
	}
	
}
