package hhswd20.trainingtracker.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import hhswd20.trainingtracker.domain.Exercise;
import hhswd20.trainingtracker.domain.ExerciseRepository;

@CrossOrigin
@Controller
public class ExerciseController {
	
	@Autowired
	private ExerciseRepository erepository;
	
	
	@RequestMapping(value = "/exerciselist")
	public String eList(Model model) {
		model.addAttribute("exercises", erepository.findAll());
		return "exerciselist";
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/addexercise")
	public String addExercise(Model model) {
		model.addAttribute("exercise", new Exercise());
		return "addexercise";
	}
	
	@RequestMapping(value = "/saveexercise", method = RequestMethod.POST)
	public String saveexercise(Exercise exercise) {
		erepository.save(exercise);
		return "redirect:exerciselist";
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/editexercise/{id}")
	public String editExercise(@PathVariable("id") Long exerciseid, Model model) {
		model.addAttribute("exercise", erepository.findById(exerciseid));
		return "editexercise";
	}
	
	//RESTful services
	@RequestMapping(value = "/exercise/{id}", method = RequestMethod.GET)
	public @ResponseBody Optional<Exercise> findExerciseRest(@PathVariable("id")Long exerciseid) {
		return erepository.findById(exerciseid);
	}
	
	
	@RequestMapping(value = "/addexercise", method = RequestMethod.POST)
	public @ResponseBody Exercise saveExerciseRest(@RequestBody Exercise exercise) {
		return erepository.save(exercise);		
	}
	
}
