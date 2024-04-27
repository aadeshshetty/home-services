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
  private _destroy$ : Subject<any> = new Subject();
  
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.cartList.pipe(takeUntil(this._destroy$)).subscribe((data)=>{
      this.cartList = data
    })
  }
  
  ngOnDestroy(): void {
    this._destroy$.next(null);
  }
}
