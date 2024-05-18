import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit, OnDestroy{
  serviceList:any = []
  constructor(private activatedRoute:ActivatedRoute,
     private cartService:CartService,private apiService:ApiService,
     private userService:UserService, private router: Router){}
  title: string = ""
  private destroy$ = new Subject<any>();
  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.title = data['serviceName'][0].toUpperCase() + data['serviceName'].slice(1)
      this.apiService.getCategoryServices(this.title.split(" ").join("").toLocaleLowerCase()).pipe(takeUntil(this.destroy$)).subscribe((services:any)=>{
        this.serviceList = services.data.services
      }
      )
    }
    )
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

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
