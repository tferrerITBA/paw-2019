package ar.edu.itba.paw.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tournament_events")
public class TournamentEvent {
	
	
	
	@EmbeddedId
	private TournamentEventId id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "tournamentid")
	private Tournament tournament;
	
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@MapsId("eventid")
	@JoinColumn(name = "eventid") // ARREGLAR
	private Event event;
	
	@Column(name = "round", nullable = false)
	private int round;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "first_teamid")
	private TournamentTeam firstTeam;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "second_teamid")
	private TournamentTeam secondTeam;
	
	@Column(name = "first_team_score", nullable = false)
	private int firstTeamScore;
	
	@Column(name = "second_team_score", nullable = false)
	private int secondTeamScore;
	
	/*package*/ TournamentEvent() {
		
	}
	
	public TournamentEvent(Tournament tournament, Event event, int round) {
		this.id = new TournamentEventId(event.getEventId());
		this.tournament = tournament;
		this.event = event;
		this.round = round;
	}
	
	public TournamentEvent(Tournament tournament, Event event, int round,
			TournamentTeam firstTeam, TournamentTeam secondTeam, int firstTeamScore,
			int secondTeamScore) {
		this.id = new TournamentEventId(event.getEventId());
		this.tournament = tournament;
		this.event = event;
		this.round = round;
		this.firstTeam = firstTeam;
		this.secondTeam = secondTeam;
		this.firstTeamScore = firstTeamScore;
		this.secondTeamScore = secondTeamScore;
	}

	public Tournament getTournament() {
		return tournament;
	}

	public Event getEvent() {
		return event;
	}

	public int getRound() {
		return round;
	}

	public TournamentTeam getFirstTeam() {
		return firstTeam;
	}

	public TournamentTeam getSecondTeam() {
		return secondTeam;
	}

	public int getFirstTeamScore() {
		return firstTeamScore;
	}

	public int getSecondTeamScore() {
		return secondTeamScore;
	}
	
	@SuppressWarnings("serial")
	@Embeddable
	private class TournamentEventId implements Serializable {
		@Column(name = "eventid", nullable = false)
		private Long eventid;
		
		/*package*/ TournamentEventId() {
			
		}
		
		public TournamentEventId(Long eventid) {
			this.eventid = eventid;
		}
		
		@Override
		public boolean equals(Object o) {
			if(o == this)
				return true;
			if(!(o instanceof TournamentEventId))
				return false;
			TournamentEventId other = (TournamentEventId) o;
			return this.getEventid().equals(other.getEventid());
		}
		
		@Override
		public int hashCode() {
			return Objects.hash(this.getEventid());
		}

		public Long getEventid() {
			return eventid;
		}
	}
	
}
