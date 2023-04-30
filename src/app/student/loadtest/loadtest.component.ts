import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/model/question';
import { enviornment } from 'src/environment/environment';
import { StudentdashboardComponent } from '../studentdashboard/studentdashboard.component';

@Component({
  selector: 'app-loadtest',
  templateUrl: './loadtest.component.html',
  styleUrls: ['./loadtest.component.css']
})
export class LoadtestComponent {

  randomTestQuestion: Question[] = [];

  constructor(private http: HttpClient, private studentDash: StudentdashboardComponent) {
    //this.getAllTestQuestion();

  }
  oneQuestion: Question = new Question();
  isLoadTest = 0;
  questionCount: number;


  getAllTestQuestion() {

    this.countOfCorrectAns = 0;
    this.questionSerialNum = 1;
    this.randomTestQuestion = [];
    this.isShowSubmit = 0;

    //above fileds are cleared again so next time test will load new questions again.
    this.http.get(enviornment.url + 'user/getAllRandomTestQuestion' + this.questionCount).subscribe(
      (data: any) => {
        if (data == null) {
          window.alert("Failed to Create Test..Try reducing question count!! ):")
          this.questionCount = null;
          this.studentDash.isShow = 0;
        }
        else {
          this.questionCount = null;

          this.randomTestQuestion = data;
          this.isLoadTest = 1;
          //console.log(data);
          this.oneQuestion = this.randomTestQuestion[0];
        }

      }
    );
  }

  questionSerialNum = 1;
  isShowSubmit = 0;
  userAns: string = "";
  countOfCorrectAns = 0;

  showNextQuestion(questionId: number) {
    if (this.oneQuestion.correctAnswer == this.userAns) {
      this.countOfCorrectAns++;
    }
    this.userAns = "";
    if (this.questionSerialNum < this.randomTestQuestion.length) {
      this.oneQuestion = new Question();
      this.oneQuestion = this.randomTestQuestion[this.questionSerialNum++];
    }
    else {
      window.alert("Test Completed..Please Submit (:");
      this.isShowSubmit = 1;
    }
  }

  resultSubmit() {
    window.alert("You Solved " + (this.countOfCorrectAns + " Out of " + this.randomTestQuestion.length) + " Questions Correctly");
    // this.isLoadTest = 0;
    //  this.countOfCorrectAns = 0;
    this.studentDash.isShow = 0;


  }

  isDisable() {
    if (this.questionCount == null)
      return true;
    else
      return false;
  }





}
