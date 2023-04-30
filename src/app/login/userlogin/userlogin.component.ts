import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { Userdata } from 'src/app/model/userdata';
import { UserserviceService } from 'src/app/services/userservice.service';
import { enviornment } from 'src/environment/environment';
import { UserdashboardComponent } from '../userdashboard/userdashboard.component';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {

  username: string = "";
  password: string = "";
  userData: Userdata[] = [];

  constructor(private http: HttpClient, private userDash: UserdashboardComponent, public service: UserserviceService) { }

  // server call to user login

  login() {
    this.http.get(enviornment.url + 'login/Userlogin' + this.username + 'and' + this.password).subscribe(
      (data: any) => {

        if (data == -1) {
          window.alert("Authentication Failed");
          this.username = undefined;
          this.password = undefined;
        }
        else if (data == 1) {
          window.alert("User Not Found");
        }
        else if (data == 2) {
          window.alert("User Not Found");
        }
        else if (data == 3) {
          window.alert("Password is Incorrect");
        }
        else if (data == 4) {
          window.alert("Login Successful");

          //server call to get userrole from database
          this.http.get(enviornment.url + 'login/getUserRole' + this.username).subscribe(
            (data: any) => {

              if (data == -1) {
                window.alert("User Not found ):");
              }
              else if (data == 0) {
                window.alert("User approval Pending..have Patience (:")
              }
              else {
                this.userDash.whoIsLogin = data;
              }
            }
          );

          //server call to get UserData to print username
          this.http.get(enviornment.url + 'login/getUserData' + this.username).subscribe(
            (data: any) => {
              if (data == null) {
                window.alert("Failed to Load User ):")
              }
              else {
                this.userData = data;
                this.service.setData(this.userData[0]);
              }
            }
          );
        }
      }
    );
  }

  howToDisable() {
    if (this.username == "" || this.password == "")
      return true;
    else
      return false;
  }
}