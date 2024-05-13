import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  categories: any[] = [
    {
      name: 'Carpentry'
    },
    {
      name: 'Plumbing'
    },
    {
      name: 'Cleaning'
    },
    {
      name: 'Applaince Repair'
    },
    {
      name: 'Painting'
    }
  ];

  topCategories : any[] =[]

  servicePackages : any[] = [
    {
      serviceName: 'Home cleaning package',
      workers: 2,
      cost: 2000,
      rating: 4
    },
    {
      serviceName: 'Applaince service package',
      workers: 2,
      cost: 2000,
      rating: 4
    },
    {
      serviceName: 'Pest control package',
      workers: 2,
      cost: 2000,
      rating: 4
    },
    {
      serviceName: 'Home sanitizing package',
      workers: 2,
      cost: 2000,
      rating: 4
    },
    {
      serviceName: 'Outdoor cleaning package',
      workers: 2,
      cost: 2000,
      rating: 4
    },
  ]

  constructor(private cartService: CartService, private router: Router, private userService: UserService, private apiService: ApiService){}

  ngOnInit(): void {
    this.topCategories = this.categories.slice(0,4);
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
}
