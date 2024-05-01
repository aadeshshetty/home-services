import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from './services/api.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showPermissionModal = false;
  showPincodeModal = false;
  private destroy$ = new Subject<any>();
  constructor(private locationService: LocationService, private apiServcie: ApiService ){}

  ngOnInit(){
    this.locationService.getShowPopUp().pipe(takeUntil(this.destroy$)).subscribe((status)=>this.showPermissionModal=status)
    this.locationService.getShowPincodePopUp().pipe(takeUntil(this.destroy$)).subscribe((status)=>this.showPincodeModal=status)
  }

  onPermissionResponse($event: boolean) {
    this.showPermissionModal = false;
    this.locationService.setShowPopUp(false);
    if($event){
      this.getAddress()
  }
}

  getAddress() {
    this.apiServcie.getLocation().subscribe({
      next:(data:any)=>{
        this.locationService.setCity(data.city || "")
        this.locationService.setPincode(data.postal || "")
      },
      error:(error:any) => {
        console.error('Error fetching address', error);
      }
  })
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
  }
}
