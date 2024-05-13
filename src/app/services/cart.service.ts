import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList : BehaviorSubject<any[]> = new  BehaviorSubject<any[]>([]);
  constructor() { }

  addToCart(service:any){
    const currList = this.cartList.getValue();
    currList.push(service);
    this.cartList.next(currList);
  }

  removeFromCart(service:any){
    let currList = this.cartList.getValue();
    currList =currList.filter((data)=>data.serviceName!==service.serviceName)
    console.log(currList);
    
    this.cartList.next(currList)
  }

  getCartItems(){
    return this.cartList.asObservable();
  }
  isInCart(service:string){
    return this.cartList.value.some(item => item.serviceName === service)
  }
}
