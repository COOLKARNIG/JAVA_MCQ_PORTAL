package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;

@RestController
@CrossOrigin
@RequestMapping("superadmin")
public class SuperadminController {

	@Autowired
	UserRepo userRepo;

	@GetMapping("getAllUnapprovedUsers")
	public List<User> getAllUnapprovedUsers() {
		try {
			List<User> unapprovedUsers = userRepo.getAllUnapprovedUsers();
			return unapprovedUsers;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping("setUserRole{selectedRole}and{userId}")
	public boolean setUserRole(@PathVariable String selectedRole, @PathVariable int userId) {
		try {
			User user = userRepo.findById(userId).get();
			if (selectedRole.equals("Trainer"))
				user.setUserRole(2);
			else if (selectedRole.equals("Student"))
				user.setUserRole(1);
			userRepo.save(user);

			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@GetMapping("getAllApprovedUsers")
	public List<User> getAllApprovedUsers() {
		try {
			return userRepo.getAllApprovedUsers();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping("changeUserRole{selectedRole}and{userId}")
	public int changeUserRole(@PathVariable String selectedRole, @PathVariable int userId) {
		try {
			User user = userRepo.findById(userId).get();
			if (selectedRole.equals("Trainer"))
				user.setUserRole(1);
			else if (selectedRole.equals("Student"))
				user.setUserRole(2);
			userRepo.save(user);
			return user.getUserRole();
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	@DeleteMapping("deactivateUser{userId}")
	public boolean deactivateUser(@PathVariable int userId) {
		try {
			User user = userRepo.findById(userId).get();
			user.setActiveUser(1);
			userRepo.save(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@GetMapping("getAllDeactiveUsers")
	public List<User> getAllDeactiveUsers() {
		try {
			return userRepo.getAllDeactiveUsers();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping("reactivateUser{userId}")
	public boolean reactivateUser(@PathVariable int userId) {
		try {
			User user = userRepo.findById(userId).get();
			user.setActiveUser(0);
			user.setUserRole(0);
			userRepo.save(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
