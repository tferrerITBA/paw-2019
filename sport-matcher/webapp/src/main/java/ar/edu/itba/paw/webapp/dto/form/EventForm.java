package ar.edu.itba.paw.webapp.dto.form;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

public class EventForm {
	
	@NotBlank
	@Size(max=100)
	private String name;
	
	@Size(max=500)
	private String description;
	
	@NotBlank
	@Pattern(regexp = "^[0-9]*[1-9][0-9]*")
	private String maxParticipants;
	
	@NotBlank
	private String date;
	
	@NotBlank
	@Pattern(regexp = "[0-9]?[0-9]")
	private String startsAtHour;
	
	@NotBlank
	@Pattern(regexp = "[0-9]?[0-9]")
	private String endsAtHour;
	
	@NotBlank
	private String inscriptionEndDate;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMaxParticipants() {
		return maxParticipants;
	}

	public void setMaxParticipants(String maxParticipants) {
		this.maxParticipants = maxParticipants;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStartsAtHour() {
		return startsAtHour;
	}

	public void setStartsAtHour(String startsAtHour) {
		this.startsAtHour = startsAtHour;
	}

	public String getEndsAtHour() {
		return endsAtHour;
	}

	public void setEndsAtHour(String endsAtHour) {
		this.endsAtHour = endsAtHour;
	}

	public String getInscriptionEndDate() {
		return inscriptionEndDate;
	}

	public void setInscriptionEndDate(String inscriptionEndDate) {
		this.inscriptionEndDate = inscriptionEndDate;
	}
	
}
