package hhswd20.trainingtracker.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Exercise {
	
	@JsonBackReference
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "exercise")
	@JsonIgnore
	private List<PR> prs;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long exerciseid;
	
	private String name;
	
	public Exercise() {
		
	}
	
	public Exercise(Long exerciseid, String name) {
		super();
		this.exerciseid = exerciseid;
		this.name = name;
	}
	
	public Exercise(String name) {
		super();
		this.name = name;
	}

	public Long getExerciseid() {
		return exerciseid;
	}

	public void setExerciseid(Long exerciseid) {
		this.exerciseid = exerciseid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<PR> getPrs() {
		return prs;
	}

	public void setPrs(List<PR> prs) {
		this.prs = prs;
	}
	
	
	
}
