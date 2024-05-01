import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  city = "";
  pincode= "";
  private destroy$ = new Subject<any>();
  constructor(private router: Router, private locationService: LocationService){}

  ngOnInit(): void {
    this.locationService.getCity().pipe(takeUntil(this.destroy$)).subscribe((city)=>this.city = city);
    this.locationService.getPincode().pipe(takeUntil(this.destroy$)).subscribe((pincode)=>this.pincode = pincode);
  }

  navigateToCart(){
    this.router.navigate(['/cart'])
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
