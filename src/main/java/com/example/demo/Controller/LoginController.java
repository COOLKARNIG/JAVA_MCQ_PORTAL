package com.example.demo.Controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;
import com.example.demo.Service.UserData;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
@RequestMapping("login")
public class LoginController
{

	@Autowired
	UserRepo userRepo;

	// Registration controller

	@PostMapping("registerUsers{username}and{password}")
	public boolean registerUsers(@PathVariable String username, @PathVariable String password, @RequestBody User user)
	{
		try {
			user.setUsername(username);
			user.setPassword(password);
			user.setUserCreationDate(new Date());

			int countByUsername = userRepo.countByUsername(username);
			if (countByUsername == 0) {
				userRepo.save(user);

			} else
				return false;
			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	// Login Controller

	// user login
	@GetMapping("Userlogin{username}and{password}")
	public int Userlogin(@PathVariable String username, @PathVariable String password)
	{
		try {
			int countByUsername = userRepo.countByUsername(username);
			
			if (countByUsername > 0) {
				User DBusername = userRepo.findByUsername(username);
				if (DBusername.getUsername().equals(username)) {
					if (DBusername.getPassword().equals(password)) {
						return 4;
					}
					return 3;
				}
				return 2;
			}
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	// get user role
	@GetMapping("getUserRole{username}")
	public int getUserRole(@PathVariable String username)
	{
		try {
			return userRepo.findByUsername(username).getUserRole();
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	// Reset password Controller

	@GetMapping("resetPassword{username}")
	public boolean resetPassword(@PathVariable String username)
	{
		try {
			User DBuser = userRepo.findByUsername(username);
			if (DBuser.getUsername().equals(username)) {
				return true;
			}

			return false;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@GetMapping("setNewPassword{PassWord}and{verifyPassword}and{username}")
	public boolean setNewPassword(@PathVariable String PassWord, @PathVariable String verifyPassword,
			@PathVariable String username)
	{
		try {
			if (PassWord.equals(verifyPassword)) {
				User user = userRepo.findByUsername(username);
				user.setPassword(verifyPassword);
				userRepo.save(user);
			}

			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@GetMapping("getUserData{username}")
	public List<UserData> getUserData(@PathVariable String username)
	{
		try {
			List<UserData> userData = userRepo.getUserData(username);
			return userData;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
