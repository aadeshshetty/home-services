import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{
  cartList: any[] = [];
  total: number = 0;
  private _destroy$ : Subject<any> = new Subject();
  
  constructor(private cartService: CartService){}

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
}
