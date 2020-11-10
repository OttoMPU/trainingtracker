package hhswd20.trainingtracker;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import hhswd20.trainingtracker.domain.Exercise;
import hhswd20.trainingtracker.domain.ExerciseRepository;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class ExerciseRepositoryTests {
	

	@Autowired
	private ExerciseRepository repository;
	
	@Test
	public void findExerciseByName() {
		List<Exercise> exercises = repository.findByName("Squat");
		
		assertThat(exercises).hasSize(1);
	}
	
	@Test
	public void CreateNewCategory() {
		Exercise exercise = new Exercise("Testexercise");
		repository.save(exercise);
		assertThat(exercise.getExerciseid()).isNotNull();
	}
	
	@Test
	public void DeleteCategory() {
		long catid = 2;
		repository.deleteById(catid);
	}
	
}
