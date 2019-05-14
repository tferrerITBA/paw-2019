package ar.edu.itba.paw.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.exception.EventFullException;
import ar.edu.itba.paw.exception.UserAlreadyJoinedException;
import ar.edu.itba.paw.interfaces.EventDao;
import ar.edu.itba.paw.interfaces.EventService;
import ar.edu.itba.paw.model.Event;
import ar.edu.itba.paw.model.User;

@Service
public class EventServiceImpl implements EventService {
	
	@Autowired
	private EventDao ed;
	
	private static final String NEGATIVE_ID_ERROR = "Id must be greater than zero.";
	private static final String NEGATIVE_PAGE_ERROR = "Page number must be greater than zero.";

	@Override
	public Optional<Event> findByEventId(long eventid) {
		if(eventid <= 0) {
			throw new IllegalArgumentException(NEGATIVE_ID_ERROR);
		}
		return ed.findByEventId(eventid);
	}

	@Override
	public List<Event> findByUsername(String username, int pageNum) {
		if(pageNum <= 0) {
			throw new IllegalArgumentException(NEGATIVE_PAGE_ERROR);
		}
		return ed.findByUsername(username, pageNum);
	}
	
	@Override
	public int countUserEventPages(long userid) {
		if(userid <= 0) {
			throw new IllegalArgumentException(NEGATIVE_ID_ERROR);
		}
		return ed.countUserEventPages(userid);
	}
	
	@Override
	public List<Event> findFutureEvents(int pageNum) {
		if(pageNum <= 0) {
			throw new IllegalArgumentException(NEGATIVE_PAGE_ERROR);
		}
		return ed.findFutureEvents(pageNum);
	}
	
	@Override
	public int countFutureEventPages() {
		return ed.countFutureEventPages();
	}

	@Transactional
	@Override
	public Event create(String name, User owner, String location, String description,
			int maxParticipants, Instant startsAt, Instant endsAt) {
		return ed.create(name, owner, location, description, maxParticipants, startsAt, endsAt);
	}

	@Transactional
	@Override
	public boolean joinEvent(final User user, final Event event)
			throws UserAlreadyJoinedException, EventFullException {
		
		// si no tiro excepcion y hago metodo separado, no obligo a validar esto
		if(countParticipants(event.getEventId()) > event.getMaxParticipants()) {
			throw new EventFullException(); 
		}
		
		return ed.joinEvent(user, event);
	}
	
	@Transactional
	@Override
	public void leaveEvent(final User user, final Event event) {
		ed.leaveEvent(user, event);
	}
	
	@Override
	public int countParticipants(final long eventid) {
		if(eventid <= 0) {
			throw new IllegalArgumentException(NEGATIVE_ID_ERROR);
		}
		return ed.countParticipants(eventid);
	}

	@Override
	public List<User> findEventUsers(final long eventid, final int pageNum) {
		if(eventid <= 0 || pageNum <= 0) {
			throw new IllegalArgumentException("Parameters must be greater than zero.");
		}
		return ed.findEventUsers(eventid, pageNum);
	}
	
	@Override
	public void deleteEvent(long eventid) {
		if(eventid <= 0) {
			throw new IllegalArgumentException(NEGATIVE_ID_ERROR);
		}
		ed.deleteEvent(eventid);
	}

}
