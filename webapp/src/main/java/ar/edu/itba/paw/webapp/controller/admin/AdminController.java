package ar.edu.itba.paw.webapp.controller.admin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ar.edu.itba.paw.webapp.controller.BaseController;

@RequestMapping("/admin")
@Controller
public class AdminController extends BaseController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);

	@RequestMapping("/")
	public ModelAndView adminIndex() {
		return new ModelAndView("admin/index");
	}
}