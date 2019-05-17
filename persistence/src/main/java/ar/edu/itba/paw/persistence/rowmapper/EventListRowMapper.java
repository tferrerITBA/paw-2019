package ar.edu.itba.paw.persistence.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import ar.edu.itba.paw.model.Event;

@Component
public class EventListRowMapper implements RowMapper<Event> {

	@Autowired
	private PitchRowMapper prm;

	@Override
	public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new Event(
				rs.getLong("eventid"),
				rs.getString("eventname"),
				prm.mapRow(rs, rowNum),
				rs.getString("description"),
				rs.getInt("max_participants"),
				rs.getTimestamp("starts_at").toInstant(),
				rs.getTimestamp("ends_at").toInstant(),
				rs.getTimestamp("event_created_at").toInstant()
			);
	}
	
}