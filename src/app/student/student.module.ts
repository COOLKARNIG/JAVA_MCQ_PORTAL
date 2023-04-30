import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { LoadtestComponent } from './loadtest/loadtest.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StudentdashboardComponent,
    LoadtestComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [StudentdashboardComponent]
})
export class StudentModule { }
