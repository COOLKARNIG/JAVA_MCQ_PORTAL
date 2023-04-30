import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { enviornment } from 'src/environment/environment';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  constructor(private http: HttpClient) { }

  user: User = new User();
  //this username and  password for  username valiadtion 
  username: string = "";
  password: string = "";

  private readonly minLength = 8;
  private readonly uppercaseRegex = /[A-Z]/;
  private readonly lowercaseRegex = /[a-z]/;
  private readonly numberRegex = /\d/;
  private readonly specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;


  validatePassword() {
    if (this.password.length < this.minLength) {
      return false;
    }

    if (!this.uppercaseRegex.test(this.password)) {
      return false;
    }

    if (!this.lowercaseRegex.test(this.password)) {
      return false;
    }

    if (!this.numberRegex.test(this.password)) {
      return false;
    }

    if (!this.specialCharRegex.test(this.password)) {
      return false;
    }

    return true;
  }



  isEmailInvalid() {
    // Validate email length and format
    if (this.user.emailId.length > 0 && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.emailId) || this.user.emailId.indexOf('@') === -1)) {
      return true;
    }
    return false;
  }


  // isPhoneNumberInvalid() {
  //   // Validate phone number length
  //   if (this.user.contactNumber.length > 0 && this.user.contactNumber.length !== 10) {
  //     return true;
  //   }
  //   return false;
  // }


  registerUser() {


    if (!this.isEmailInvalid()) {
      if (this.validatePassword()) {
        //server call to register user
        this.http.post(enviornment.url + 'login/registerUsers' + this.username + 'and' + this.password, this.user).subscribe(
          (data: any) => {

            if (data == false) {
              window.alert("UserName alredy exist ):");
            }
            else {
              window.alert("Registration Succsesfull (:");
              this.user = new User();
              this.username = undefined;
              this.password = undefined;
            }
          }
        );
      }
      else {
        window.alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character")
      }
    }
    else { window.alert("Please enter a valid email address.") }


  }



  howToDisable() {
    if (this.user.firstName == "" || this.user.lastName == "" ||
      this.user.emailId == "" || this.user.dateOfBirth == undefined ||
      this.user.contactNumber == null || this.username == "" || this.password == "")
      return true;
    else
      return false;
  }
}


