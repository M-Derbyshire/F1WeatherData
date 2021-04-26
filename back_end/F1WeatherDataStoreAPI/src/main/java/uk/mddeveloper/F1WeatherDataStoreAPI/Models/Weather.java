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
	
	private String time;
	
	@OneToOne(mappedBy = "weather")
	private Round round;
	
	//The variable names here are the names given to these values by the Meteostat weather API.
	
	

	@Column(name = "airtemp")
	private float temp;
	
	@Column(name = "dewpoint")
	private float dwpt;
	
	@Column(name = "relativehumidity")
	private int rhum;
	
	@Column(name = "hourTotalPrecipitation")
	private float prcp;
	
	@Column(name = "snowdepth")
	private int snow;
	
	@Column(name = "winddirection")
	private int wdir;
	
	@Column(name = "avgwindspeed")
	private float wspd;
	
	@Column(name = "peakwindgust")
	private float wpgt;
	
	@Column(name = "airpressure")
	private float pres;
	
	@Column(name = "hourtotalsunshine")
	private int tsun;
	
	@Column(name = "conditioncode")
	private int coco;
	
	
	
	
	
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
