package uk.mddeveloper.F1WeatherDataStoreAPI.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Weather {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "weatherstation")
	private String stationID;
	
	@Column(nullable = true)
	private String time;
	
	@OneToOne(mappedBy = "weather")
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

	public float getTemp() {
		return temp;
	}

	public void setTemp(float temp) {
		this.temp = temp;
	}

	public float getDwpt() {
		return dwpt;
	}

	public void setDwpt(float dwpt) {
		this.dwpt = dwpt;
	}

	public int getRhum() {
		return rhum;
	}

	public void setRhum(int rhum) {
		this.rhum = rhum;
	}

	public float getPrcp() {
		return prcp;
	}

	public void setPrcp(float prcp) {
		this.prcp = prcp;
	}

	public int getSnow() {
		return snow;
	}

	public void setSnow(int snow) {
		this.snow = snow;
	}

	public int getWdir() {
		return wdir;
	}

	public void setWdir(int wdir) {
		this.wdir = wdir;
	}

	public float getWspd() {
		return wspd;
	}

	public void setWspd(float wspd) {
		this.wspd = wspd;
	}

	public float getWpgt() {
		return wpgt;
	}

	public void setWpgt(float wpgt) {
		this.wpgt = wpgt;
	}

	public float getPres() {
		return pres;
	}

	public void setPres(float pres) {
		this.pres = pres;
	}

	public int getTsun() {
		return tsun;
	}

	public void setTsun(int tsun) {
		this.tsun = tsun;
	}

	public int getCoco() {
		return coco;
	}

	public void setCoco(int coco) {
		this.coco = coco;
	}
	
	
	public Round getRound() {
		return round;
	}

	public void setRound(Round round) {
		this.round = round;
	}
	
	
}
