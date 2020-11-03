package hhswd20.trainingtracker.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface PRRepository extends CrudRepository<PR, Long> {

	List<PR> findByDate(String date);
	
}
