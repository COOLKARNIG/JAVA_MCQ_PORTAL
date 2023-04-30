package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entity.Question;




public interface QuestionRepo extends JpaRepository<Question, Integer>
{
	@Query(value="select * from question  where is_delete_question=0",nativeQuery = true)
	List<Question>getAllActiveQuestion();
	
	@Query(value="select count(*) from question where is_delete_question=0",nativeQuery = true)
	int getCountOfAvalaibleQuestion();
	
	@Query(value="select * from question  order by rand() limit ?1",nativeQuery = true)
	List<Question> getRandomTestQuestion(int QuestionCount);
	
	

}
