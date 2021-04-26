package uk.mddeveloper.F1WeatherDataStoreAPI.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Round {
	
	public Round() {}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="number")
	private int round;
	
	@Column(name="racedate")
	private String raceDate;
	
	@Column(name="racetimeutc")
	private String raceTime;
	
	@OneToOne
	@JoinColumn(name = "weatherid")
	private Weather weather;
	
	@ManyToOne
	@JoinColumn(name = "circuitid")
	private Circuit circuit;
	
	@ManyToOne
	@JoinColumn(name = "createdby")
	private Contributer creator;
	
	
	
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getRound() {
		return round;
	}

	public void setRound(int round) {
		this.round = round;
	}

	public String getRaceDate() {
		return raceDate;
	}

	public void setRaceDate(String raceDate) {
		this.raceDate = raceDate;
	}

	public String getRaceTime() {
		return raceTime;
	}

	public void setRaceTime(String raceTime) {
		this.raceTime = raceTime;
	}
	
	public Weather getWeather() {
		return weather;
	}

	public void setWeather(Weather weather) {
		this.weather = weather;
	}

	public Circuit getCircuit() {
		return circuit;
	}

	public void setCircuit(Circuit circuit) {
		this.circuit = circuit;
	}

	public Contributer getCreator() {
		return creator;
	}

	public void setCreator(Contributer creator) {
		this.creator = creator;
	}
	
	
}