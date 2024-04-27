import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit{
  constructor(private activatedRoute:ActivatedRoute, private cartService:CartService){}
  title: string = ""
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => this.title = data['serviceName'][0].toUpperCase() + data['serviceName'].slice(1)
    )
  }
  addToCart(servcie:any){
    const serv = {
      servcieName: 'Bathroom Cleaning Package',
      cost:2000,
      noOfWorkers: 2
    }
    this.cartService.addToCart(serv)
  }
}
