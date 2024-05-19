import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // url = 'https://home-services-api.onrender.com/api'
  url = 'http://localhost:3000/api'
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

  getCategories(){
    return this.http.get(`${this.url}/auth/get-categories`)
  }

  getServices(){
    return this.http.get(`${this.url}/auth/get-services`)
  }

  getCategoryServices(name:string){
    return this.http.post(`${this.url}/auth/get-services`,{categoryName:name})
  }

  addToCart(service:any){
    const token = sessionStorage.getItem("token")
    return this.http.post(`${this.url}/auth/add-to-cart`,{token:token,servicename:service.servicename,Workers:service.Workers,Price:service.Price})
  }

  getCartItems(){
    const token = sessionStorage.getItem("token")
    return this.http.post(`${this.url}/auth/get-cart`,{token:token})
  }

  removeFromCart(service:any){
    const token = sessionStorage.getItem("token")
    return this.http.post(`${this.url}/auth/remove-from-cart`,{token:token,servicename:service.servicename})
  }

  createOrder(amount:any){
    const token = sessionStorage.getItem("token")
    return this.http.post(`${this.url}/auth/generate-order`, { amount, token });
  }

  verifyPayment(details:any){
    return this.http.post('/api/paymentVerification', details);
  }
}
