package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entity.Topic;

public interface TopicRepo extends JpaRepository<Topic, Integer>
{
//native Query
	@Query(value="SELECT * FROM topic where is_delete_topic=0",nativeQuery = true)
	List<Topic>getAllActiveTopic();
	
	@Query(value="SELECT * FROM topic where is_delete_topic=0 and topicname=?1",nativeQuery = true)
	Topic findByTopicname(String topicname);
}
