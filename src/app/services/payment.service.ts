import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apiService: ApiService) { }
  createOrder(amount: number, cartList:any) {
    const items = cartList.map((item:any)=>item.servicename)
    return this.apiService.createOrder(amount, items)
  }

  verifyPayment(details: any) {
    return lastValueFrom(this.apiService.verifyPayment(details))
  }
}
