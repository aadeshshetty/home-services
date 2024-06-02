import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{
  cartList: any[] = [];
  total: number = 0;
  private _destroy$ : Subject<any> = new Subject();
  
  constructor(private cartService: CartService, private paymentService:PaymentService, private toaster: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.cartService.getCartItems().pipe(takeUntil(this._destroy$)).subscribe((data:any)=>{
      this.cartList = data?.data?.cartItems
      data?.data?.cartItems.forEach((item:any)=>{
        this.total += Number(item.Price)
      })
    })
  }

  removeFromCart(service:any){
    this.cartService.removeFromCart(service);
    this.total = 0;
    this.ngOnInit()
  }
  
  ngOnDestroy(): void {
    this._destroy$.next(null);
  }
  pay(amount: number) {
    this.paymentService.createOrder(amount,this.cartList).pipe(takeUntil(this._destroy$)).subscribe({
      next:(response: any) => {
      const options = {
        key: 'rzp_test_kHYTS78CyLG4Jq',
        amount: amount * 100,
        currency: 'INR',
        name: 'Fixup4u',
        description: 'Payment',
        order_id: response.data.orderId,
        handler:this.orderConfimed.bind(this),
        callback_url:'/home',
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Your Address',
        },
        theme: {
          color: '#3399cc',
        },
      };      
      const rzp1 = new Razorpay(options);
      rzp1.open();
    },
    error:(err)=>{
      this.toaster.error(err?.message,'Payment')
    }
  });
  }

  async orderConfimed(response:any){
      const payment:any = await this.paymentService.verifyPayment({
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
      })
      if(payment.status.includes('success')){
        this.toaster.success("Order Confimed",'Fixup4u');
        this.cartService.emptyCart();
        this.router.navigate(['/']);
      }else{
        this.toaster.error("Payment Failed","Fixup4u")
      }
  }
}
