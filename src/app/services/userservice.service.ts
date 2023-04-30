import { Injectable } from '@angular/core';
import { Userdata } from '../model/userdata';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor() { }

  private user: Userdata = new Userdata();

  setData(localuser: Userdata) {
    this.user = localuser;
  }

  getData() {
    return this.user;
  }
}
