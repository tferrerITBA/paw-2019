package ar.edu.itba.paw.webapp.exception;

public class UserNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public UserNotFoundException() {
		super("The requested user was not found.");
	}

}