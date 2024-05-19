import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apiService: ApiService) { }
  createOrder(amount: number) {
    return this.apiService.createOrder(amount)
  }

  verifyPayment(details: any) {
    return this.apiService.verifyPayment(details)
  }
}
