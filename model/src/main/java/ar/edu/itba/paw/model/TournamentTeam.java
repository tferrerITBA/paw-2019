package ar.edu.itba.paw.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tournament_teams")
public class TournamentTeam {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tournaments_teamid_seq")
	@SequenceGenerator(sequenceName = "tournaments_teamid_seq", name = "tournaments_teamid_seq", allocationSize = 1)
	@Column(name = "teamid")
	private long teamId;
	
	@Column(name = "teamname", length = 100, nullable = false)
	private String teamName;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "tournamentid")
	private Tournament tournament;
	
	@OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "tournamentTeam")
	private List<TournamentInscription> inscriptions;
	
	/*package*/ TournamentTeam() {
		
	}
	
	public TournamentTeam(String teamName, Tournament tournament) {
		this.teamName = teamName;
		this.tournament = tournament;
	}
	
	@Override
	public String toString() {
		return "TeamName: " + teamName + "; Tournament: " + tournament;
	}
	
	@Override
	public boolean equals(Object o) {
		if(o == this)
			return true;
		if(!(o instanceof TournamentTeam))
			return false;
		TournamentTeam other = (TournamentTeam) o;
		return this.getTeamId() == other.getTeamId() && this.getTeamName().equals(other.getTeamName()) 
				&& this.getTournament().equals(other.getTournament());
	}
	
	public long getTeamId() {
		return teamId;
	}
	
	public String getTeamName() {
		return teamName;
	}
	
	public Tournament getTournament() {
		return tournament;
	}
	
}
