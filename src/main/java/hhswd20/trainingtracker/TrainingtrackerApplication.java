package hhswd20.trainingtracker;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import hhswd20.trainingtracker.domain.Exercise;
import hhswd20.trainingtracker.domain.ExerciseRepository;
import hhswd20.trainingtracker.domain.PR;
import hhswd20.trainingtracker.domain.PRRepository;
import hhswd20.trainingtracker.domain.User;
import hhswd20.trainingtracker.domain.UserRepository;

@SpringBootApplication
public class TrainingtrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrainingtrackerApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner demo(PRRepository prrepository, ExerciseRepository erepository, UserRepository urepository) {
		return (args) -> {
			
			Exercise e1 = new Exercise("Squat");
			Exercise e2 = new Exercise("Deadlift");
			Exercise e3 = new Exercise("Bench press");
			Exercise e4 = new Exercise("Overhead press");
			
			erepository.save(e1);
			erepository.save(e2);
			erepository.save(e3);
			erepository.save(e4);
			
			prrepository.save(new PR(80, 4, 9, "03.11.2020", e3)); 
			prrepository.save(new PR(50, 3, 7, "03.11.2020", e4)); 
			
			User user = new User("Otto", "$2a$08$6/QS2BZnswh27Xgbao3njejRarlD57.CzwJnzYp5Twbtn5q.dDeg.", "ADMIN");
			
			urepository.save(user);
			
		};
	}

}
