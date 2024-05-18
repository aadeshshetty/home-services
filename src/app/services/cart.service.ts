import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList : BehaviorSubject<any[]> = new  BehaviorSubject<any[]>([]);
  private destroy$ = new Subject<any>();
  constructor(private apiService: ApiService, private toaster:ToastrService) { }

  addToCart(service:any){
    const currList = this.cartList.getValue();
    currList.push(service);
    this.cartList.next(currList);
    this.apiService.addToCart(service).subscribe({
      next:(data:any)=>{
        if(data.type === 'error'){
          this.toaster.error(data.message,'Cart')
        }
      },
      error:(err)=>{
      this.toaster.error(err?.error?.message,'Cart',{timeOut:3000})
      }
    })
  }

  removeFromCart(service:any){
    let currList = this.cartList.getValue();
    currList =currList.filter((data)=>data.servicename!==service.servicename)
    console.log(currList);
    
    this.cartList.next(currList)
    this.apiService.removeFromCart(service).pipe(takeUntil(this.destroy$)).subscribe({
      next:(data:any)=>{
        if(data.type === 'error'){
          this.toaster.error(data.message,'Cart')
        }
      },
      error:(err)=>{
      this.toaster.error(err?.error?.message,'Cart',{timeOut:3000})
      }
  })
  }

  getCartItems(){
    this.apiService.getCartItems().pipe(takeUntil(this.destroy$)).subscribe({
      next:(data:any)=>{
        this.cartList.next(data?.data?.cartItems)
    },
    error:(error:any)=>{
      this.toaster.error(error?.error?.message,'Cart',{timeOut:3000})
    }
  })
  return this.apiService.getCartItems()
  }
  isInCart(service:string){
    return this.cartList.value.some(item => item.servicename === service)
  }

  ngOnDestroy(){
    this.destroy$.next(null);
    }
}
