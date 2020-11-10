package hhswd20.trainingtracker.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import hhswd20.trainingtracker.domain.ExerciseRepository;
import hhswd20.trainingtracker.domain.PR;
import hhswd20.trainingtracker.domain.PRRepository;

@Controller
public class PRController {
	
	@Autowired
	private PRRepository prrepository;
	
	@Autowired
	private ExerciseRepository erepository;
	
	
	@RequestMapping(value = "/prlist")
	public String prList(Model model) {
		model.addAttribute("prs", prrepository.findAll());
		return "prlist";
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/add")
	public String addPR(Model model) {
		model.addAttribute("pr", new PR());
		model.addAttribute("exercises", erepository.findAll());
		return "addpr";
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(PR pr) {
		prrepository.save(pr);
		return "redirect:prlist";
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/edit/{id}")
	public String editPR(@PathVariable("id") Long prid, Model model) {
		model.addAttribute("pr", prrepository.findById(prid));
		model.addAttribute("exercises", erepository.findAll());
		return "editpr";
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
	public String deletePR(@PathVariable("id") Long prid, Model model) {
		prrepository.deleteById(prid);
		return "redirect:../prlist";
	}
	
}
