package ar.edu.itba.paw.interfaces;

import java.util.List;
import java.util.Optional;

import ar.edu.itba.paw.model.Club;
import ar.edu.itba.paw.model.User;

public interface ClubDao {
	
	public Optional<Club> findById(long clubid);
	
	public List<Club> findByOwnerId(long ownerid);
	
	public Club create(User owner, String name, String location);

}