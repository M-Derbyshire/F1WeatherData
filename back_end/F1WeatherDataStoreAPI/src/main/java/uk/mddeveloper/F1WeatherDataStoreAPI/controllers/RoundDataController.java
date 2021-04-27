package uk.mddeveloper.F1WeatherDataStoreAPI.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Circuit;
import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Contributer;
import uk.mddeveloper.F1WeatherDataStoreAPI.Models.Country;
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
		return roundRepo.findByQuarterAndRaceDateContainsOrderByRaceDateAsc(quarter, year);
	}
	
	@PostMapping
	public List<Round> create(@RequestBody final List<Round> rounds)
	{
		List<Round> responseRounds = new ArrayList<Round>(rounds.size());
		
		for(Round r : rounds)
		{
			//First, does this round exist already?
			List<Round> matchingRounds = roundRepo.findByQuarterAndRaceDateContains(r.getQuarter(), r.getRaceDate());
			if(matchingRounds.size() > 0)
			{
				responseRounds.add(matchingRounds.get(0));
				continue;
			}
			
			
			//For now, we're just using the only user we have as the creator
			Contributer creator = contributorRepo.findFirstBy();
			r.setCreator(creator);
			
			
			//The round also needs a circuit
			r.setCircuit(getOrSaveRelevantCircuit(r.getCircuit()));
			
			
			//Create the Weather record, if data is available
			if(r.getWeather() != null)
			{
				weatherRepo.saveAndFlush(r.getWeather());
			}
			
			responseRounds.add(roundRepo.save(r));
		}
		
		roundRepo.flush();
		return responseRounds;
	}
	
	
	
	
	private Circuit getOrSaveRelevantCircuit(Circuit providedCircuit)
	{
		//We will need the actual PK, which we currently won't have (circuitId is a different field)
		Circuit foundCircuit = circuitRepo.findFirstByCircuitId(providedCircuit.getCircuitId());
		if(foundCircuit != null) return foundCircuit;
		
		
		//Does this country already exist?
		Country country = countryRepo.findFirstByName(providedCircuit.getCountry().getName());
		if(country == null)
		{
			country = providedCircuit.getCountry();
		}
		providedCircuit.setCountry(countryRepo.saveAndFlush(country));
		
		
		//Now we can save and return the created record.
		return circuitRepo.saveAndFlush(providedCircuit);
	}
}
