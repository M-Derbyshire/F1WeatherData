package uk.mddeveloper.F1WeatherDataStoreAPI.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping
	@RequestMapping("{year}/{quarter}")
	public List<Round> getByYearAndQuarter(@PathVariable String year, @PathVariable int quarter)
	{
		return roundRepo.findByQuarterAndRaceDateContains(quarter, year);
	}
	
//	@PostMapping
//	public List<Round> create(@RequestBody final List<Round> rounds)
//	{
//		List<Round> response = new ArrayList<Round>(rounds.size());
//		
//		for(Round r : rounds)
//		{
//			response.add(roundRepo.save(r));
//		}
//		
//		roundRepo.flush();
//		
//		return response;
//	}
	
}
