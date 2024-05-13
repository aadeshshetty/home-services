import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://home-services-api.onrender.com/api'
  constructor(private http: HttpClient) { }

  getLocation(){
    return this.http.get(`https://ipapi.co/json`);
  }

  getOtpOnEmail(email:string,name:string){
    return this.http.post(`${this.url}/auth/register`,{email:email,name:name})
  }

  verifyOtp(userId:string,otp:string){
    return this.http.post(`${this.url}/auth/verify`,{userId:userId,otp:otp})
  }
  setPassword(userId:string,password:string){
    return this.http.post(`${this.url}/auth/set-password`,{userId:userId,password:password})
  }

  login(email:string,password:string){
    return this.http.post(`${this.url}/auth/login`,{email:email,password:password})
  }

  getUserId(token:string){
    return this.http.post(`${this.url}/auth/get-user`,{token:token})
  }
}
