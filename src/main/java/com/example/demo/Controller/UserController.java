package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Question;
import com.example.demo.Repo.QuestionRepo;

@RestController
@CrossOrigin
@RequestMapping("user")
public class UserController
{
	@Autowired
	QuestionRepo questionRepo;

	@GetMapping("getAllRandomTestQuestion{questionCount}")
	public List<Question> getAllRandomTestQuestion(@PathVariable int questionCount)
	{
		try {

			int count = questionRepo.getCountOfAvalaibleQuestion();
			if (questionCount < count) {
				List<Question> question = questionRepo.getRandomTestQuestion(questionCount);
				return question;
			} else
				return null;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
