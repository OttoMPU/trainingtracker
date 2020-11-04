package hhswd20.trainingtracker.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import hhswd20.trainingtracker.domain.Exercise;
import hhswd20.trainingtracker.domain.ExerciseRepository;

@Controller
public class ExerciseController {
	
	@Autowired
	private ExerciseRepository erepository;
	
	
	@RequestMapping(value = "/exerciselist")
	public String eList(Model model) {
		model.addAttribute("exercises", erepository.findAll());
		return "exerciselist";
	}
	
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
	
	@RequestMapping(value = "/editexercise/{id}")
	public String editExercise(@PathVariable("id") Long exerciseid, Model model) {
		model.addAttribute("exercise", erepository.findById(exerciseid));
		return "editexercise";
	}
	
}
