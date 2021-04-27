package uk.mddeveloper.F1WeatherDataStoreAPI.Models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Contributer {
	
	public Contributer() {}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	private long id;
	
	private String email;
	
	@JsonIgnore
	private String password;
	
	@Column(columnDefinition = "BIT")
	private boolean active;
	
	
	@OneToMany(mappedBy = "creator")
	@JsonIgnore
	private List<Round> createdRounds;
	
	
	
	

	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}
	
	
	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	
	public List<Round> getCreatedRounds() {
		return createdRounds;
	}

	public void setCreatedRounds(List<Round> createdRounds) {
		this.createdRounds = createdRounds;
	}
	
	
}
