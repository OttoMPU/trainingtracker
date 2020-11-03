package hhswd20.trainingtracker;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import hhswd20.trainingtracker.domain.PR;
import hhswd20.trainingtracker.domain.PRRepository;

@SpringBootApplication
public class TrainingtrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrainingtrackerApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner demo(PRRepository prrepository) {
		return (args) -> {
			
			prrepository.save(new PR(80, 4, 9, "03.11.2020")); //flatbench
			prrepository.save(new PR(50, 3, 7, "03.11.2020")); //ohp
			
		};
	}

}
