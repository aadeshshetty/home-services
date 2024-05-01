import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  city : Subject<string> = new Subject<string>();
  pincode : Subject<string> = new Subject<string>();
  showPopup : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  showPincodePopup : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  setCity(city:string){
    this.city.next(city)
  }
  setPincode(pincode:string){
    this.pincode.next(pincode)
  }
  setShowPopUp(status:boolean){
    this.showPopup.next(status)
  }
  setShowPincodePopUp(status:boolean){
    this.showPincodePopup.next(status)
  }

  getCity(){
    return this.city.asObservable();
  }
  getPincode(){
    return this.pincode.asObservable();
  }
  getShowPopUp(){
    return this.showPopup.asObservable();
  }
  getShowPincodePopUp(){
    return this.showPincodePopup.asObservable();
  }

}
