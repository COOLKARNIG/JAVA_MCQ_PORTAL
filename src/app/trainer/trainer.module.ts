import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerdashboardComponent } from './trainerdashboard/trainerdashboard.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { AddtopicComponent } from './addtopic/addtopic.component';
import { ShowallquestionComponent } from './showallquestion/showallquestion.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    TrainerdashboardComponent,
    AddquestionComponent,
    AddtopicComponent,
    ShowallquestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule

  ],
  exports: [TrainerdashboardComponent,
    AddquestionComponent,
    AddtopicComponent,
    ShowallquestionComponent
  ]
})
export class TrainerModule { }
