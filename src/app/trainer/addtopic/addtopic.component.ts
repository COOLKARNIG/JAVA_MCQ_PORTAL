import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { enviornment } from 'src/environment/environment';
import { Topic } from 'src/app/model/topic';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.css']
})
export class AddtopicComponent {

  constructor(private http: HttpClient) { }

  checkTopicAddedOrNot(topicName: string) {

    //to avoid adding same topic again.(case diff. not ignored)
    let cnt: number = 0;
    for (let i = 0; i < this.allTopicList.length; i++) {
      if (this.allTopicList[i].topicname == topicName) {
        window.alert("Topic already Exists!!");
        return ++cnt;
      }
    }
    return 0;
  }

  EnteredTopic: string = "";

  disable() {
    if (this.EnteredTopic == "")
      return true;
    else
      return false;
  }

  addTopic(topicName: string) {
    let cnt = this.checkTopicAddedOrNot(topicName)

    // if cnt==0 means topic did not exists in system
    if (cnt == 0) {
      this.http.get(enviornment.url + 'trainer/addTopic' + topicName).subscribe(
        (data: any) => {
          if (data == null) {
            "Failed to Add Topic ):"
          }
          else {

            if (window.confirm("Do You Want To Add Topic!!") == true) {
              window.alert("Topic Added Successfully (:")

              //to add topic in list in ui add it to [] so create blank object
              // let mytopic: Topic = new Topic();
              // mytopic.topicname = topicName;
              this.allTopicList.push(data);
              //clear topicname field if topic succesfully added.
              this.EnteredTopic = "";
            }
          }
        }
      );

    }

  }
  //array to store list data from response
  allTopicList: Topic[] = [];

  isShowAllTopic = 0;

  showAllTopic() {
    //server call to get all topic
    this.http.get(enviornment.url + 'trainer/getAllTopicList').subscribe(
      (data: any) => {

        if (data == null) {
          window.alert("No Topic To Show ):");
        }
        else {
          this.allTopicList = data;
          this.isShowAllTopic = 1;
          //this.isShowAllTopic = num;
        }

      }
    );
  }
  // to update topic name
  isUpdate = 0;
  topicId = 0;

  action(num: number) {
    this.isUpdate = 0;
    //to hide updata box ==0
    this.topicId = num;
  }


  // delete topic
  delete(topicId: number) {
    //server call to delete topic on basis of topicID
    this.http.delete(enviornment.url + 'trainer/deleteTopic' + topicId).subscribe(
      (data: any) => {

        if (!data) {
          window.alert("Unable to Delete Topic ):");
        }
        else {

          if (window.confirm("Do You Want To Delete Topic!!") == true) {
            window.alert("Topic Successfully Deleted (:");
            //to remove topic on UI itself
            for (let i = 0; i < this.allTopicList.length; i++) {
              if (this.allTopicList[i].id == topicId) {
                this.allTopicList.splice(i, 1);
                break;
                // splice will remove 1 element from topic where index will match
              }
            }
          }

        }
      }
    );
  }

  updatedTopicName: string = "";

  updateTopicName(topicid: number) {

    let cnt = this.checkTopicAddedOrNot(this.updatedTopicName)

    if (cnt == 0) {
      //server call to update topic name
      this.http.get(enviornment.url + 'trainer/updateTopicname' + this.updatedTopicName + 'and' + topicid).subscribe(
        (data: any) => {
          if (!data) {
            window.alert("Failed to Update Topic Name ):");
          }
          else {

            window.alert("Topic Name successfully Updated (:");
            //show changes to UI also.
            for (let i = 0; i < this.allTopicList.length; i++) {
              if (this.allTopicList[i].id == topicid) {
                this.allTopicList[i].topicname = this.updatedTopicName;
                break;

              }
            }

          }
          //to hide update area once updated
          this.isUpdate = 1;
        }
      );
    }
  }




}


