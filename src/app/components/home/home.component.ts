import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private cartService: CartService, private router: Router){}

  addToCart(servcie:any){
    const serv = {
      servcieName: 'Bathroom Cleaning Package',
      cost:2000,
      noOfWorkers: 2
    }
    this.cartService.addToCart(serv)
  }

  navigateToServices(service:string){
    this.router.navigateByUrl(`/services/${service}`)
  }
}
