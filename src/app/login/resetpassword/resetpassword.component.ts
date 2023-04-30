import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { enviornment } from 'src/environment/environment';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  IssetPassword = 0;
  username: string = "";
  password: string = "";
  verifyPassword: string = "";

  constructor(private http: HttpClient) { }

  resetPassword(username: string) {
    // Send a  request to the Spring Boot handler with the username
    this.http.get(enviornment.url + 'login/resetPassword' + username).subscribe(
      (data: any) => {
        if (!data) {
          window.alert("UserName not Found!! ):")
        }
        else {
          window.alert("Proceed Further to Reset PassWord (:")
          this.IssetPassword = 1;
        }
      }
    );
  }

  checkDoneForUsername() {
    if (this.username == "")
      return true;
    else
      return false;
  }

  checkDoneForPassword() {
    if (this.password == "" || this.verifyPassword == "")
      return true;
    else
      return false;
  }

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


  setNewPassword() {
    if (this.validatePassword()) {
      if (this.password == this.verifyPassword) {
        //server call to set password
        this.http.get(enviornment.url + 'login/setNewPassword' + this.password + 'and' + this.verifyPassword + 'and' + this.username).subscribe(
          (data: any) => {
            if (!data) {
              window.alert("Failed to Reset Password ):")
            }
            else {
              if (window.confirm("Do You Want To Change Password !!!") == true) {
                window.alert("Password Succesfully Reset (:")

                this.IssetPassword = 0;
                this.username = "";
                this.password = "";
                this.verifyPassword = "";
              }

            }

          }
        );
      }
      else {
        window.alert("Entered Password Does Not Matched")
      }
    }
    else {
      window.alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character")
    }

  }

}
