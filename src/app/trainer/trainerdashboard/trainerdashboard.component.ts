import { Component } from '@angular/core';
import { UserdashboardComponent } from 'src/app/login/userdashboard/userdashboard.component';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-trainerdashboard',
  templateUrl: './trainerdashboard.component.html',
  styleUrls: ['./trainerdashboard.component.css']
})
export class TrainerdashboardComponent {

  constructor(private userDash: UserdashboardComponent, public service: UserserviceService) { }

  //trainer logout from trainerdashboard to userdashboard(login dashboard)
  logout() {
    if (window.confirm("Do You Want To LogOut!!") == true) { this.userDash.whoIsLogin = 0; }
  }

  show = 0;

  whatToShow(num: number) {
    this.show = num
  }
}



