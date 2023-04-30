import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserdashboardComponent } from 'src/app/login/userdashboard/userdashboard.component';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent {
  constructor(private userDash: UserdashboardComponent, public service: UserserviceService) { }

  isShow = 0;

  whatToShow(num: number) {
    this.isShow = num;
  }

  logout() {
    if (window.confirm("Do You Want To LogOut!!") == true) {
      this.userDash.whoIsLogin = 0;
    }
  }
}
