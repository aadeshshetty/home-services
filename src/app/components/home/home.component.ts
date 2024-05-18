import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  private destroy$ : Subject<any> = new Subject<any>();
  categories: any[] = [];

  topCategories : any[] =[]

  servicePackages : any[] = []
  
  topServicePackages : any[] = []

  constructor(private cartService: CartService, private router: Router, private userService: UserService, private apiService: ApiService, private toaster: ToastrService){}

  ngOnInit(): void {
    this.cartService.getCartItems();
    this.apiService.getCategories().pipe(takeUntil(this.destroy$)).subscribe({
      next:(data:any)=>{
      if(data?.type && data?.type==='success'){
        this.categories = data?.data?.categories
        this.topCategories = this.categories.slice(0,Math.min(4,this.categories.length))
      }
    },
    error:(error:any)=>{
      this.toaster.error(error?.error?.message,'Login',{timeOut:3000})
    }
  })
    this.apiService.getServices().pipe(takeUntil(this.destroy$)).subscribe({
      next:(data:any)=>{
      if(data?.type && data?.type==='success'){
        this.servicePackages = data?.data?.services
        this.topServicePackages = this.servicePackages.slice(0,Math.min(8,this.servicePackages.length))
      }
    },
    error:(error:any)=>{
      this.toaster.error(error?.error?.message,'Login',{timeOut:3000})
    }
  })
  }
  
  addToCart(service:any){
    this.userService.getUserId().subscribe((id)=>{
      if(!id){
        const token = sessionStorage.getItem('token')
        if(!token)
          this.router.navigate(['login'])
        else
          this.apiService.getUserId(token).subscribe((data:any)=>{
            this.userService.setUserId(data?.data?.userId)
            })
      }
      else this.cartService.addToCart(service)
    })
  }

  removeFromCart(service:any){
    this.cartService.removeFromCart(service);
  }

  isInCart(service:string){
    return this.cartService.isInCart(service)
  }

  navigateToServices(service:string){
    this.router.navigateByUrl(`/services/${service}`)
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
