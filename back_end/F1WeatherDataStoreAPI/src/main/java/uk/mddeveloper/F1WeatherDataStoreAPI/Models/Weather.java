package uk.mddeveloper.F1WeatherDataStoreAPI.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Weather {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	private long id;
	
	@Column(name = "weatherstation")
	private String stationID;
	
	@Column(nullable = true)
	private String time;
	
	@OneToOne(mappedBy = "weather")
	@JsonIgnore
	private Round round;
	
	//The variable names here are the names given to these values by the Meteostat weather API.
	
	

	@Column(name = "airtemp", nullable = true)
	private Float temp;
	
	@Column(name = "dewpoint", nullable = true)
	private Float dwpt;
	
	@Column(name = "relativehumidity", nullable = true)
	private Integer rhum;
	
	@Column(name = "hourtotalprecipitation", nullable = true)
	private Float prcp;
	
	@Column(name = "snowdepth", nullable = true)
	private Integer snow;
	
	@Column(name = "winddirection", nullable = true)
	private Integer wdir;
	
	@Column(name = "avgwindspeed", nullable = true)
	private Float wspd;
	
	@Column(name = "peakwindgust", nullable = true)
	private Float wpgt;
	
	@Column(name = "airpressure", nullable = true)
	private Float pres;
	
	@Column(name = "hourtotalsunshine", nullable = true)
	private Integer tsun;
	
	@Column(name = "conditioncode", nullable = true)
	private Integer coco;
	
	
	
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getStationID() {
		return stationID;
	}

	public void setStationID(String stationID) {
		this.stationID = stationID;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Float getTemp() {
		return temp;
	}

	public void setTemp(Float temp) {
		this.temp = temp;
	}

	public Float getDwpt() {
		return dwpt;
	}

	public void setDwpt(Float dwpt) {
		this.dwpt = dwpt;
	}

	public Integer getRhum() {
		return rhum;
	}

	public void setRhum(Integer rhum) {
		this.rhum = rhum;
	}

	public Float getPrcp() {
		return prcp;
	}

	public void setPrcp(Float prcp) {
		this.prcp = prcp;
	}

	public Integer getSnow() {
		return snow;
	}

	public void setSnow(Integer snow) {
		this.snow = snow;
	}

	public Integer getWdir() {
		return wdir;
	}

	public void setWdir(Integer wdir) {
		this.wdir = wdir;
	}

	public Float getWspd() {
		return wspd;
	}

	public void setWspd(Float wspd) {
		this.wspd = wspd;
	}

	public Float getWpgt() {
		return wpgt;
	}

	public void setWpgt(Float wpgt) {
		this.wpgt = wpgt;
	}

	public Float getPres() {
		return pres;
	}

	public void setPres(Float pres) {
		this.pres = pres;
	}

	public Integer getTsun() {
		return tsun;
	}

	public void setTsun(Integer tsun) {
		this.tsun = tsun;
	}

	public Integer getCoco() {
		return coco;
	}

	public void setCoco(Integer coco) {
		this.coco = coco;
	}
	
	
	public Round getRound() {
		return round;
	}

	public void setRound(Round round) {
		this.round = round;
	}
	
	
}
