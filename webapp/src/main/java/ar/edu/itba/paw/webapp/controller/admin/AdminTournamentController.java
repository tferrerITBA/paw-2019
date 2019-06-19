package ar.edu.itba.paw.webapp.controller.admin;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import ar.edu.itba.paw.exception.DateInPastException;
import ar.edu.itba.paw.exception.EndsBeforeStartsException;
import ar.edu.itba.paw.exception.EventHasNotEndedException;
import ar.edu.itba.paw.exception.HourOutOfRangeException;
import ar.edu.itba.paw.exception.InscriptionDateExceededException;
import ar.edu.itba.paw.exception.InscriptionDateInPastException;
import ar.edu.itba.paw.exception.InsufficientPitchesException;
import ar.edu.itba.paw.exception.InvalidTeamAmountException;
import ar.edu.itba.paw.exception.InvalidTeamSizeException;
import ar.edu.itba.paw.exception.MaximumDateExceededException;
import ar.edu.itba.paw.exception.UnevenTeamAmountException;
import ar.edu.itba.paw.interfaces.ClubService;
import ar.edu.itba.paw.interfaces.EmailService;
import ar.edu.itba.paw.interfaces.EventService;
import ar.edu.itba.paw.interfaces.TournamentService;
import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.model.Club;
import ar.edu.itba.paw.model.Event;
import ar.edu.itba.paw.model.Sport;
import ar.edu.itba.paw.model.Tournament;
import ar.edu.itba.paw.model.TournamentEvent;
import ar.edu.itba.paw.model.TournamentTeam;
import ar.edu.itba.paw.model.User;
import ar.edu.itba.paw.webapp.controller.BaseController;
import ar.edu.itba.paw.webapp.exception.ClubNotFoundException;
import ar.edu.itba.paw.webapp.exception.TournamentNotFoundException;
import ar.edu.itba.paw.webapp.exception.UserNotFoundException;
import ar.edu.itba.paw.webapp.form.NewTournamentForm;
import ar.edu.itba.paw.webapp.form.TournamentResultForm;

@RequestMapping("/admin")
@Controller
public class AdminTournamentController extends BaseController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AdminTournamentController.class);
	private static final String TIME_ZONE = "America/Buenos_Aires";
	private static final int MIN_HOUR = 9;
	private static final int MAX_HOUR = 23;
	private static final int DAY_LIMIT = 7;
	
	@Autowired
	private TournamentService ts;
	
	@Autowired
	private ClubService cs;
	
	@Autowired
	private EventService es;
	
	@Autowired
	private UserService us;
	
	@Autowired
	private EmailService ems;
	
	@RequestMapping(value = "/tournament/{tournamentId}")
    public ModelAndView retrieveTournament(@PathVariable("tournamentId") long tournamentid,
    		@RequestParam(value = "round", required = false) final Integer roundPage,
			@ModelAttribute("tournamentResultForm") final TournamentResultForm form) 
    		throws TournamentNotFoundException {
		
		Tournament tournament = ts.findById(tournamentid).orElseThrow(TournamentNotFoundException::new);
		
		if(roundPage == null) {
			return retrieveTournament(tournamentid, ts.getMinRoundForResultInput(tournament), form);
		}
		
		if(tournament.getInscriptionSuccess()) {
			ModelAndView mav = new ModelAndView("admin/tournament");
			mav.addObject("tournament",  tournament);
			mav.addObject("club", tournament.getTournamentClub());
			mav.addObject("teamsScoresMap", ts.getTeamsScores(tournament));
			
			List<TournamentEvent> roundEvents = ts.findTournamentEventsByRound(tournamentid, roundPage);
			mav.addObject("roundEvents", roundEvents);
			Map<Long, Boolean> eventsHaveResult = new HashMap<>();
			for(TournamentEvent event : roundEvents) {
				eventsHaveResult.put(event.getEventId(), event.getFirstTeamScore() != null);
			}
			mav.addObject("eventsHaveResult", eventsHaveResult);
			mav.addObject("roundInPast", roundEvents.get(0).getEndsAt().compareTo(Instant.now()) <= 0);
			
			mav.addObject("currRoundPage", roundPage);
			mav.addObject("maxRoundPage", tournament.getRounds());
			
			return mav;
		} else {
			ModelAndView mav = new ModelAndView("admin/tournamentInscription");
			mav.addObject("tournament",  tournament);
			mav.addObject("club", tournament.getTournamentClub());
			List<TournamentTeam> teams = new ArrayList<>(tournament.getTeams());
			Comparator<TournamentTeam> cmp = new Comparator<TournamentTeam>() {
				@Override
				public int compare(TournamentTeam team1, TournamentTeam team2) {
					return ((Long)team1.getTeamid()).compareTo(team2.getTeamid());
				}
			};
			Collections.sort(teams, cmp);
		    mav.addObject("teams", teams);
		    mav.addObject("roundsAmount", tournament.getRounds());
		    mav.addObject("startsAt", ts.findTournamentEventsByRound(tournament.getTournamentid(), 1).get(0).getStartsAt());
		    Map<Long, List<User>> teamsUsers = ts.mapTeamMembers(tournamentid);
		    mav.addObject("teamsUsers", teamsUsers);
		    return mav;
		}
    }
	
	
	@RequestMapping(value = "/tournament/{tournamentId}/event/{eventId}/result", method = { RequestMethod.POST })
    public ModelAndView comment(@PathVariable("tournamentId") long tournamentid, @PathVariable("eventId") long eventid,
    		@Valid @ModelAttribute("tournamentResultForm") final TournamentResultForm form, final BindingResult errors,
			HttpServletRequest request) throws TournamentNotFoundException {
		
		Integer firstResult = tryInteger(form.getFirstResult());
    	Integer secondResult = tryInteger(form.getSecondResult());
    	if(firstResult == null)
    		errors.rejectValue("firstResult", "wrong_int_format");
    	if(secondResult == null)
    		errors.rejectValue("secondResult", "wrong_int_format");
		
		if(errors.hasErrors()) {
    		return retrieveTournament(tournamentid, null, form);
    	}
		
		Tournament tournament = ts.findById(tournamentid).orElseThrow(TournamentNotFoundException::new);
		try {
			ts.postTournamentEventResult(tournament, eventid, firstResult, secondResult);
		} catch (EventHasNotEndedException e) {
			ModelAndView mav = retrieveTournament(tournamentid, null, form);
    		mav.addObject("event_has_not_ended", true);
    		return mav;
		}
		
	    return new ModelAndView("redirect:/admin/tournament/" + tournamentid);
	}
	
	
	@RequestMapping(value = "/tournaments/{pageNum}")
	public ModelAndView retrieveEvents(@PathVariable("pageNum") final int pageNum) {
		
		ModelAndView mav = new ModelAndView("admin/tournamentList");
		
		List<Tournament> tournaments = ts.findBy(pageNum);
		mav.addObject("tournaments", tournaments);
		mav.addObject("tournamentQty", tournaments.size());
		mav.addObject("page", pageNum);
		mav.addObject("pageInitialIndex", ts.getPageInitialTournamentIndex(pageNum));
		mav.addObject("totalTournamentQty", ts.countTournamentTotal());
		mav.addObject("lastPageNum", ts.countTotalTournamentPages());
		mav.addObject("now", Instant.now());
		
		return mav;
	}
	
	
	@RequestMapping(value = "/club/{clubId}/tournament/new")
    public ModelAndView tournamentFormView(@PathVariable("clubId") long clubid,
    		@ModelAttribute("newTournamentForm") final NewTournamentForm form) 
    				throws ClubNotFoundException {
		
		ModelAndView mav = new ModelAndView("admin/newTournament");
		Club club = cs.findById(clubid).orElseThrow(ClubNotFoundException::new);
		mav.addObject("club", club);
		
		mav.addObject("availableHours", es.getAvailableHoursMap(MIN_HOUR, MAX_HOUR));
		mav.addObject("minHour", MIN_HOUR);
		mav.addObject("maxHour", MAX_HOUR);
		
		List<Event> clubEvents = cs.findCurrentEventsInClub(clubid, Sport.SOCCER);
		mav.addObject("schedule", cs.convertEventListToSchedule(clubEvents, MIN_HOUR, MAX_HOUR, DAY_LIMIT));
		mav.addObject("scheduleHeaders", es.getScheduleDaysHeader());
		mav.addObject("pitchQty", club.getClubPitches().stream()
				.filter(p -> p.getSport() == Sport.SOCCER).collect(Collectors.toList()).size());
		mav.addObject("currentDate", LocalDate.now());
		mav.addObject("currentDateTime", LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES));
		mav.addObject("aWeekFromNowDate", LocalDate.now().plus(7, ChronoUnit.DAYS));
		mav.addObject("aWeekFromNowDateTime", LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES).plus(7, ChronoUnit.DAYS));
    	
        return mav;
    }
    
	
    @RequestMapping(value = "/club/{clubId}/tournament/create", method = { RequestMethod.POST })
    public ModelAndView createTournament(@PathVariable("clubId") long clubId,
    		@Valid @ModelAttribute("newTournamentForm") final NewTournamentForm form,
			final BindingResult errors, HttpServletRequest request) throws ClubNotFoundException {
    	
    	Integer maxTeams = tryInteger(form.getMaxTeams());
    	Integer teamSize = tryInteger(form.getTeamSize());
    	Instant firstRoundDate = tryInstantStartOfDay(form.getFirstRoundDate(), TIME_ZONE);
    	Integer startsAt = tryInteger(form.getStartsAtHour());
    	Integer endsAt = tryInteger(form.getEndsAtHour());
    	Instant inscriptionEndDate = tryDateTimeToInstant(form.getInscriptionEndDate(), TIME_ZONE);
    	
    	if(maxTeams == null)
    		errors.rejectValue("maxTeams", "wrong_int_format");
    	if(teamSize == null)
    		errors.rejectValue("teamSize", "wrong_int_format");
    	if(firstRoundDate == null)
    		errors.rejectValue("firstRoundDate", "wrong_date_format");
    	if(startsAt == null)
    		errors.rejectValue("startsAtHour", "wrong_int_format");
    	if(endsAt == null)
    		errors.rejectValue("endsAtHour", "wrong_int_format");
    	if(inscriptionEndDate == null)
    		errors.rejectValue("inscriptionEndDate", "wrong_date_format");
    	
    	if(errors.hasErrors()) {
    		return tournamentFormView(clubId, form);
    	}
    	
    	Club club = cs.findById(clubId).orElseThrow(ClubNotFoundException::new);
    	Tournament tournament = null;
    	
    	try {
    		/* Only SOCCER Tournaments are supported for now */
        	tournament = ts.create(form.getName(), Sport.SOCCER, club, maxTeams,
        			teamSize, firstRoundDate, startsAt, endsAt, inscriptionEndDate, loggedUser());
    	} catch(DateInPastException e) {
    		return tournamentCreationError("event_in_past", clubId, form);
    	} catch(MaximumDateExceededException e) {
    		return tournamentCreationError("date_exceeded", clubId, form);
    	} catch(EndsBeforeStartsException e) {
    		return tournamentCreationError("ends_before_starts", clubId, form);
    	} catch(HourOutOfRangeException e) {
    		return tournamentCreationError("hour_out_of_range", clubId, form);
    	} catch(InvalidTeamAmountException e) {
    		return tournamentCreationError("invalid_team_amount", clubId, form);
    	} catch(UnevenTeamAmountException e) {
    		return tournamentCreationError("uneven_team_amount", clubId, form);
    	} catch(InvalidTeamSizeException e) {
    		return tournamentCreationError("invalid_team_size", clubId, form);
    	} catch(InscriptionDateInPastException e) {
    		return tournamentCreationError("inscription_date_in_past", clubId, form);
    	} catch(InscriptionDateExceededException e) {
    		return tournamentCreationError("inscription_date_exceeded", clubId, form);
    	} catch(InsufficientPitchesException e) {
    		return tournamentCreationError("insufficient_pitches", clubId, form);
    	}
    	
    	LOGGER.debug("Tournament {} created", tournament);
    	
    	return new ModelAndView("redirect:/admin/tournament/" + tournament.getTournamentid());
    }
    
    
    private ModelAndView tournamentCreationError(String error, long clubId, NewTournamentForm form) 
    		throws ClubNotFoundException {
    	ModelAndView mav = tournamentFormView(clubId, form);
		mav.addObject(error, true);
		return mav;
    }
    
    
    @RequestMapping(value = "/tournament/{tournamentId}/delete", method = { RequestMethod.POST })
	public ModelAndView deleteEvent(@PathVariable("tournamentId") final long tournamentid)
			throws TournamentNotFoundException, InscriptionDateInPastException {
    	Tournament tournament = ts.findById(tournamentid).orElseThrow(TournamentNotFoundException::new);
    	Map<Long, List<User>> teamsMap = ts.mapTeamMembers(tournamentid);
    	
    	ts.deleteTournament(tournamentid);
		
    	for(List<User> teamMembers : teamsMap.values()) {
			for(User user : teamMembers) {
				ems.tournamentCancelled(user, tournament, LocaleContextHolder.getLocale());
			}
		}
    	
		LOGGER.debug("Deleted tournament with id {}", tournamentid);
		return new ModelAndView("redirect:/admin/tournaments/1");
	}
    
    
    @RequestMapping(value = "/tournament/{tournamentId}/kick-user/{userId}", method = { RequestMethod.POST })
    public ModelAndView kickUserFromTournament(
    		@PathVariable("tournamentId") long tournamentid, @PathVariable("userId") long kickedUserId) 
    				throws UserNotFoundException, TournamentNotFoundException, InscriptionDateInPastException {
    	
    	Tournament tournament = ts.findById(tournamentid).orElseThrow(TournamentNotFoundException::new);
    	User kickedUser = us.findById(kickedUserId).orElseThrow(UserNotFoundException::new);
    	
    	ts.kickFromTournament(kickedUser, tournament);
    	ems.youWereKicked(kickedUser, tournament, LocaleContextHolder.getLocale());
    	
    	return new ModelAndView("redirect:/admin/tournament/" + tournamentid);
    }
    
    
    @ExceptionHandler({ TournamentNotFoundException.class })
	public ModelAndView tournamentNotFoundHandler() {
		return new ModelAndView("404");
	}
	
}
