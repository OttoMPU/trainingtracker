package hhswd20.trainingtracker;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import hhswd20.trainingtracker.domain.PR;
import hhswd20.trainingtracker.domain.PRRepository;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class PRRepositoryTests {
	
	@Autowired
	private PRRepository repository;
	
	@Test
	public void findByAuthorShouldReturnBook() {
		List<PR> prs = repository.findByDate("03.11.2020");
		
		assertThat(prs).hasSize(2);
		assertThat(prs.get(0).getWeight()).isEqualTo(80);
	}
	
	@Test
	public void createNewBook() {
		PR pr = new PR(0, 5, 10, "01.01.1970", null);
		repository.save(pr);
		assertThat(pr.getPrid()).isNotNull();
	}
	
	@Test
	public void DeletePR() {
		long prid = 5;
		repository.deleteById(prid);
	}

	
}
