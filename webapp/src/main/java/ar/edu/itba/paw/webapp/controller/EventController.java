package ar.edu.itba.paw.webapp.controller;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import ar.edu.itba.paw.exception.EventFullException;
import ar.edu.itba.paw.exception.UserAlreadyJoinedException;
import ar.edu.itba.paw.interfaces.EmailService;
import ar.edu.itba.paw.interfaces.EventService;
import ar.edu.itba.paw.model.Event;
import ar.edu.itba.paw.model.User;
import ar.edu.itba.paw.webapp.form.FiltersForm;
import ar.edu.itba.paw.webapp.form.NewEventForm;


@Controller
public class EventController extends BaseController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(EventController.class);
	private static final String TIME_ZONE = "America/Buenos_Aires";
	private static final String START_DATE = "startsAt";
	private static final String DURATION = "endsAt";
	private static final String MAX_PARTICIPANTS = "maxParticipants";
	
	@Autowired
	private EventService es;

    @Autowired
    private EmailService ems;
	
	@RequestMapping("/home")
	public ModelAndView home()	{
//		ems.joinEventEmail("sswinnen@itba.edu.ar","Juan", "Evento", getLocale());
	    return new ModelAndView("home");
	}

	@RequestMapping("/my-events/{page}")
	public ModelAndView list(@PathVariable("page") final int pageNum)	{
		ModelAndView mav = new ModelAndView("myEvents");
		mav.addObject("events", es.findByUsername(loggedUser().getUsername(), pageNum));
	    return mav;
	}

    @RequestMapping(value = "/event/{id}")
    public ModelAndView retrieveElement(@PathVariable long id)
    	throws EventNotFoundException {
	    ModelAndView mav = new ModelAndView("event");
	    Event event = es.findByEventId(id).orElseThrow(EventNotFoundException::new);
	    List<User> participants = es.findEventUsers(event.getEventId(), 1);
        mav.addObject("event", event);
        mav.addObject("participant_count", es.countParticipants(event.getEventId()));
        mav.addObject("participants", participants);
        mav.addObject("is_participant", participants.contains(loggedUser()));
        return mav;
    }
    
    @RequestMapping(value = "/event/{id}/join", method = { RequestMethod.POST })
    public ModelAndView joinEvent(@PathVariable long id)
    	throws EventNotFoundException {
	    Event event = es.findByEventId(id).orElseThrow(EventNotFoundException::new);
	    
	    try {
	    	es.joinEvent(loggedUser(), event);
	    	
	    } catch(EventFullException e) {
	    	ModelAndView mav = new ModelAndView("redirect:/event/" + id);
	    	mav.addObject("eventFullError", true);
	    	return mav;
	    } catch(UserAlreadyJoinedException e) {
	    	LOGGER.debug("User {} tried to join event {}, but had already joined", loggedUser(), event);
	    	ModelAndView mav = new ModelAndView("redirect:/event/" + id);
	    	mav.addObject("alreadyJoinedError", true);
	    	return mav;
	    }
        return new ModelAndView("redirect:/event/" + id);
    }
    
    @RequestMapping(value = "/event/{id}/leave", method = { RequestMethod.POST })
    public ModelAndView leaveEvent(@PathVariable long id)
    	throws EventNotFoundException {
	    Event event = es.findByEventId(id).orElseThrow(EventNotFoundException::new);
	    es.leaveEvent(loggedUser(), event);
        return new ModelAndView("redirect:/event/" + id);
    }

    @RequestMapping(value = "/events/{pageNum}")
    public ModelAndView retrieveEvents(@ModelAttribute("filtersForm") final FiltersForm form,
                                         @PathVariable("pageNum") final int pageNum,
                                         @RequestParam(value = "est" ,required = false) String establishment,
                                         @RequestParam(value = "sport", required = false) String sport,
                                         @RequestParam(value = "org", required = false) String organizer,
                                         @RequestParam(value = "vac", required = false) String vacancies,
                                         @RequestParam(value = "date", required = false) String date) {
        String queryString = buildQueryString(establishment,sport,organizer,vacancies,date);
        ModelAndView mav = new ModelAndView("list");
        mav.addObject("page", pageNum);
        mav.addObject("queryString", queryString);
        mav.addObject("filtersForm",form);
        mav.addObject("lastPageNum", es.countFutureEventPages());
        mav.addObject("events", es.findFutureEvents(pageNum));
        return mav;
    }
    
    @RequestMapping(value = "/event/create", method = { RequestMethod.POST })
    public ModelAndView createEvent(
    		@Valid @ModelAttribute("newEventForm") final NewEventForm form,
			final BindingResult errors,
			HttpServletRequest request) {
    	Integer duration = performDurationValidations(form, errors);
    	Integer maxParticipants = performMaxParticipantsValidations(form, errors);
    	Instant from = performDateValidations(form, errors);
    	if(errors.hasErrors()) {
    		return newEvent(form);
    	}
    	Event e = es.create(form.getName(), loggedUser(), form.getLocation(), form.getDescription(),
    			maxParticipants, from, from.plus(duration, ChronoUnit.HOURS));
    	return new ModelAndView("redirect:/event/" + e.getEventId());
    }
    
	@RequestMapping("/event/new")
	public ModelAndView newEvent(@ModelAttribute("newEventForm") final NewEventForm form) {
		return new ModelAndView("newEvent");
	}

    @RequestMapping(value = "/events/filter")
    public ModelAndView applyFilter(@ModelAttribute("filtersForm") final FiltersForm form) {
        String establishment = form.getEstablishment();
        String sport = form.getSport();
        String organizer = form.getOrganizer();
        String vacancies = form.getVacancies();
        String date = form.getDate();
        String queryString = buildQueryString(establishment, sport, organizer, vacancies, date);
        return new ModelAndView("redirect:/events/1" + queryString);
    }

    private String buildQueryString(final String establishment, final String sport,
                                    final String organizer, final String vacancies, final String date){
	    StringBuilder strBuilder = new StringBuilder();
	    strBuilder.append("?");
        if(establishment != null && !establishment.isEmpty()) { strBuilder.append("est=").append(establishment).append("&"); }
        if(sport != null && !sport.isEmpty()) { strBuilder.append("sport=").append(sport).append("&"); }
        if(organizer != null && !organizer.isEmpty()) { strBuilder.append("org=").append(organizer).append("&"); }
        if(vacancies != null && !vacancies.isEmpty()) { strBuilder.append("vac=").append(vacancies).append("&"); }
        if(date != null && !date.isEmpty()) { strBuilder.append("date=").append(date); }
        else {strBuilder.deleteCharAt(strBuilder.length()-1);}
        return strBuilder.toString();
    }
    
    private Instant performDateValidations(NewEventForm form, BindingResult errors) {
    	Instant inst = null;
    	String date = form.getStartsAt();
    	if(date.isEmpty())
    		return null;
    	try {
    		inst = LocalDateTime.parse(date).atZone(ZoneId.of(TIME_ZONE)).toInstant();
       	} catch(DateTimeParseException e) {
    		errors.rejectValue(START_DATE, "wrong_date_format");
    		return null;
    	}
    	if(inst.isBefore(Instant.now())) {
    		errors.rejectValue(START_DATE, "future_date_required");
    		return null;
    	}
    	return inst;
    }
    
    private Integer performDurationValidations(NewEventForm form, BindingResult errors) {
    	Integer duration = null;
    	try {
    		duration = Integer.parseInt(form.getEndsAt());
    	} catch(NumberFormatException e) {
    		errors.rejectValue(DURATION, "wrong_int_format");
    		return null;
    	}
    	if(duration <= 0) {
    		errors.rejectValue(DURATION, "gt_zero");
    		return null;
    	}
    	return duration;
    }
    
    private Integer performMaxParticipantsValidations(NewEventForm form, BindingResult errors) {
    	Integer maxParticipants = null;
    	try {
    		maxParticipants = Integer.parseInt(form.getMaxParticipants());
    	} catch(NumberFormatException e) {
    		errors.rejectValue(MAX_PARTICIPANTS, "wrong_int_format");
    		return null;
    	}
    	if(maxParticipants <= 0) {
    		errors.rejectValue(MAX_PARTICIPANTS, "gt_zero");
    		return null;
    	}
    	return maxParticipants;
    }

	@ExceptionHandler({EventNotFoundException.class})
	private ModelAndView eventNotFound() {
		return new ModelAndView("404");
	}

}
