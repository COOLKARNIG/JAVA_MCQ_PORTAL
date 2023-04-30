import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Question } from 'src/app/model/question';
import { Topic } from 'src/app/model/topic';
import { enviornment } from 'src/environment/environment';

@Component({
  selector: 'app-showallquestion',
  templateUrl: './showallquestion.component.html',
  styleUrls: ['./showallquestion.component.css']
})
export class ShowallquestionComponent {


  AllTopicList: Topic[] = [];

  constructor(private http: HttpClient) {

    //getAllTopic handler is already written in topic section so copied it
    //given a dropdown from which user will select particular topic from database
    this.http.get(enviornment.url + 'trainer/getAllTopicList').subscribe(
      (data: any) => {
        if (data == null) {
          window.alert("Failed to Load Topic List ):");
        }
        else {
          this.AllTopicList = data;
        }
      }
    );
  }

  selectedTopic: string = "";
  allQuestionOfTopic: Question[] = [];

  selectTopic(event: any) {
    this.selectedTopic = event.target.value;

    this.http.get(enviornment.url + 'trainer/getAllQuestionOfTopic' + this.selectedTopic).subscribe(
      (data: any) => {
        if (data == null) { window.alert("Failed to Load Questions ):") }
        else {
          this.allQuestionOfTopic = data;


        }

      }
    );
  }


  // delete question
  delete(questionId: number) {
    //server call to delete topic on basis of topicID
    this.http.delete(enviornment.url + 'trainer/deleteQuestion' + questionId + 'and' + this.selectedTopic).subscribe(
      (data: any) => {

        if (!data) {
          window.alert("Unable to Delete Question ):");
        }
        else {
          if (window.confirm("Do You Want To Delete Question!!") == true) {
            window.alert("Question Successfully Deleted (:");
            //to remove question on UI itself
            for (let i = 0; i < this.allQuestionOfTopic.length; i++) {
              if (this.allQuestionOfTopic[i].id == questionId) {
                this.allQuestionOfTopic.splice(i, 1);
                break;
                // splice will remove 1 element from question where index will match
              }
            }
          }
        }
      }
    );
  }

  showDetails = 0;
  myQuestionDetail: Question = new Question();
  showQuestionDetails(questionId: number) {
    this.showDetails = 1;
    //server call to show selected question
    this.http.get(enviornment.url + 'trainer/getSelectedQuestionDetail' + questionId).subscribe(
      (data: any) => {
        if (data == null) {
          window.alert("Failed to Load Question): ")
        }
        else {
          this.myQuestionDetail = data;
        }
      }
    );
  }

  backToMenu() {
    this.showDetails = 0;
  }

  updateClicked() {
    this.showDetails = 2;
  }

  updateQuestion() {

    //Server Call to Update the Question
    this.http.post(enviornment.url + 'trainer/updateQuestion', this.myQuestionDetail).subscribe(
      (data: any) => {
        if (!data) {
          alert("Failed to Update Question ):");
        }
        else {
          alert("Question Successfully Updated (:");
          //this.showDetails=0;   If You want to go to main Menu...UnComment This
        }
      }
    );

  }




}
