package ar.edu.itba.paw.webapp.form;

import org.hibernate.validator.constraints.NotBlank;

public class NewClubForm {
	
	@NotBlank
	private String name;

	@NotBlank
	private String location;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() { return location; }

	public void setLocation(String location) {
		this.location = location;
	}
	
}
