package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entity.User;
import com.example.demo.Service.UserData;

public interface UserRepo extends JpaRepository<User, Integer>
{
	int countByUsername(String username);

	
	@Query(value = "select * from user\r\n"
			+ " where active_user=0 and user_role!=0 and username=?1",nativeQuery = true)
	User findByUsername(String username);
	
	@Query(value = "SELECT first_name as firstName,last_name as lastName FROM user\r\n"
			+ "where username=?1",nativeQuery = true)
	List<UserData> getUserData(String username);
	
	//for superAdmin to approve  registered users where userRole=0.
	@Query(value = "select * from user \r\n"
			+ "where user_role=0 and active_user=0", nativeQuery = true)
	List<User>getAllUnapprovedUsers();
	
	//List of Approved Users to Change the Role
	@Query(value = "select * from user\r\n"
			+ " where user_role not in(0,3) and active_user=0",nativeQuery = true)
	List<User> getAllApprovedUsers();

	//List of Deactive Users
	@Query(value = "select * from user\r\n"
			+ " where active_user=1",nativeQuery = true)
	List<User> getAllDeactiveUsers();

}
