import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(sessionStorage.getItem('token')?true:false);
  constructor() { }

  getUserId(){
    return this.userId.asObservable();
  }
  getIsLoggedIn(){
    return this.isLoggedIn.asObservable();
  }

  setUserId(id:string){
    this.userId.next(id);
  }

  setIsLoggedIn(status:boolean){
    this.isLoggedIn.next(status)
  }
}
