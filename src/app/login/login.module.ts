import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserloginComponent } from './userlogin/userlogin.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { StudentModule } from '../student/student.module';
import { TrainerModule } from '../trainer/trainer.module';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SuperadminModule } from '../superadmin/superadmin.module';





@NgModule({
  declarations: [
    UserloginComponent,
    UserdashboardComponent,
    UserRegistrationComponent,
    ResetpasswordComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StudentModule,
    TrainerModule,
    SuperadminModule

  ],
  providers: [],
  bootstrap: [UserdashboardComponent] // directly this component will open on start
})
export class LoginModule { }
