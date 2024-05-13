import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  city = "";
  pincode= "";
  isLoggedIn = false;
  private destroy$ = new Subject<any>();
  constructor(private router: Router, private locationService: LocationService, private userServcie:UserService, private apiService: ApiService){}

  ngOnInit(): void {
    this.locationService.getCity().pipe(takeUntil(this.destroy$)).subscribe((city)=>this.city = city);
    this.locationService.getPincode().pipe(takeUntil(this.destroy$)).subscribe((pincode)=>this.pincode = pincode);
    this.userServcie.getIsLoggedIn().subscribe((status:boolean)=>this.isLoggedIn = status)
  }

  navigateToCart(){
    this.userServcie.getUserId().subscribe((id)=>{
      if(!id){
        const token = sessionStorage.getItem('token')
        if(!token)
          this.router.navigate(['login'])
        else
          this.apiService.getUserId(token).subscribe((data:any)=>{
        this.userServcie.setUserId(data?.data?.userId)
        })
      }else{
        this.router.navigate(['cart'])
      }
    })
  }
  login(){
    this.router.navigate(['login'])
  }


  showPopUp(){
    this.locationService.setShowPopUp(true);
  }
  showPincodePopup(){
    this.locationService.setShowPincodePopUp(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(false)
  }
}
