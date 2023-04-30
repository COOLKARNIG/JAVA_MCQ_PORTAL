import { Component } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {

  constructor(public service: UserserviceService) { }

  isShow = 0;
  whoIsLogin = 0;

  show(num: number) {
    this.isShow = num
  }
}
