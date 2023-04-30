package com.example.demo.Controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Question;
import com.example.demo.Entity.Topic;
import com.example.demo.Repo.QuestionRepo;
import com.example.demo.Repo.TopicRepo;

@RestController
@CrossOrigin
@RequestMapping("trainer")
public class TrainerController
{

	@Autowired
	TopicRepo topicRepo;

	@Autowired
	QuestionRepo questionRepo;

	@GetMapping("addTopic{topicName}")
	public Topic addTopic(@PathVariable String topicName)
	{
		try {
			//topicName=topicName.toUpperCase();
			Topic topic = new Topic();
			topic.setTopicname(topicName);
			topic.setCreationDate(new Date());
			topicRepo.save(topic);
			return topic;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping("getAllTopicList")
	public List<Topic> getAllTopicList()
	{
		try {
			return topicRepo.getAllActiveTopic();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@DeleteMapping("deleteTopic{topicId}")
	public boolean deleteTopic(@PathVariable int topicId)
	{
		try {
			Topic topic = topicRepo.findById(topicId).get();
			topic.setIsDeleteTopic(1);
			topicRepo.save(topic);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@GetMapping("updateTopicname{updatedTopicName}and{topicid}")
	public boolean updateTopicname(@PathVariable String updatedTopicName, @PathVariable int topicid)
	{
		try {
			Topic topic = topicRepo.findById(topicid).get();
			topic.setTopicname(updatedTopicName);
			topicRepo.save(topic);

			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@PostMapping("addQuestion{selectedTopic}")
	public boolean addQuestion(@PathVariable String selectedTopic, @RequestBody Question question)
	{

		try { // save question in database
			question.setCreationDate(new Date());
			questionRepo.save(question);

			// add question in topic
			Topic topic = topicRepo.findByTopicname(selectedTopic);
			List<Question> questions = topic.getQuestions();
			questions.add(question);
			topicRepo.save(topic);

			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@GetMapping("getAllQuestionOfTopic{selectedTopic}")
	public List<Question> getAllQuestionOfTopic(@PathVariable String selectedTopic)
	{
		try {
			Topic topic = topicRepo.findByTopicname(selectedTopic);
			return topic.getQuestions();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@DeleteMapping("deleteQuestion{questionId}and{selectedTopic}")
	public boolean deleteQuestion(@PathVariable int questionId, @PathVariable String selectedTopic)
	{
		try {
			// set question isDelete=1(not active)
			Question question = questionRepo.findById(questionId).get();
			question.setIsDeleteQuestion(1);
			questionRepo.save(question);

			// find topic and get list of questions in it and then remove

//			Topic topic = topicRepo.findByTopicname(selectedTopic);
//			List<Question> questions = topic.getQuestions();
//			questions.remove(questions.indexOf(question));
//			topicRepo.save(topic);

			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@GetMapping("getSelectedQuestionDetail{questionId}")
	public Question getSelectedQuestionDetail(@PathVariable int questionId)
	{
		try {
			return questionRepo.findById(questionId).get();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@PostMapping("updateQuestion")
	public boolean updateQuestion(@RequestBody Question updatedQuestion)
	{
		try {
			int id = updatedQuestion.getId();

			// Update Question in QuestionRepo
			Question question = questionRepo.findById(id).get();

			question.setShortName(updatedQuestion.getShortName());
			question.setQuestionDetail(updatedQuestion.getQuestionDetail());
			question.setOptionA(updatedQuestion.getOptionA());
			question.setOptionB(updatedQuestion.getOptionB());
			question.setOptionC(updatedQuestion.getOptionC());
			question.setOptionD(updatedQuestion.getOptionD());
			question.setCorrectAnswer(updatedQuestion.getCorrectAnswer());
			question.setCreationDate(updatedQuestion.getCreationDate());

			questionRepo.save(question);

			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
