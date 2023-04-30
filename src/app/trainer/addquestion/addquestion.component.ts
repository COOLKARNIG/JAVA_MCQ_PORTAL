import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from 'src/app/model/topic';
import { enviornment } from 'src/environment/environment';
import { Question } from 'src/app/model/question';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent {

  AllTopicList: Topic[] = [];

  constructor(private http: HttpClient) {

    // method wriiten inside so when component load constructor also load every time
    //and will refresh and load all question when called.
    //getAllTopic handler is already written in topic section so copied it

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
  //variable to 2 way data binding
  selectedTopic: string = "";
  //create object of question class and bind all properties with its variable
  question: Question = new Question();

  addQuestion() {
    //server call to add question in database
    this.http.post(enviornment.url + 'trainer/addQuestion' + this.selectedTopic, this.question).subscribe(
      (data: any) => {
        if (!data) {
          window.alert("Failed to Add Question ):");
        }
        else {
          window.alert("Question Successfully added (:");
          this.question = new Question();
        }

      }
    );
  }

  howToDisable() {
    if (this.question.optionA == "" || this.question.optionB == "" || this.question.optionC == "" || this.question.optionD == "" || this.question.correctAnswer == "" || this.question.shortName == "")
      return true;
    else
      return false;
  }


}
