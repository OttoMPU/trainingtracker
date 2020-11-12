package hhswd20.trainingtracker.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;




@Entity
public class PR {
	
	@ManyToOne
	@JoinColumn(name="exerciseid")
	private Exercise exercise;
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long prid;
	
	private int weight, reps, rpe;
	private String date;

	public PR() {
		
	}
	
	public PR(Long prid, int weight, int reps, int rpe, String date, Exercise exercise) {
		super();
		this.prid = prid;
		this.weight = weight;
		this.reps = reps;
		this.rpe = rpe;
		this.date = date;
	}
	
	public PR(int weight, int reps, int rpe, String date, Exercise exercise) {
		super();
		this.weight = weight;
		this.reps = reps;
		this.rpe = rpe;
		this.date = date;
		this.exercise = exercise;
	}
	
	public Long getPrid() {
		return prid;
	}

	public void setPrid(Long prid) {
		this.prid = prid;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public int getReps() {
		return reps;
	}

	public void setReps(int reps) {
		this.reps = reps;
	}

	public int getRpe() {
		return rpe;
	}

	public void setRpe(int rpe) {
		this.rpe = rpe;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Exercise getExercise() {
		return exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}
	
	
}
