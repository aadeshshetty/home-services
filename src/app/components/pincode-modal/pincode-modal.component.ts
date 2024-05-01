import { Component } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-pincode-modal',
  templateUrl: './pincode-modal.component.html',
  styleUrls: ['./pincode-modal.component.css']
})
export class PincodeModalComponent {
  pincode:any = ''
  constructor(private locationService:LocationService){}
  close(){
    this.locationService.setShowPincodePopUp(false);
  }
  updatePincode(){
    this.locationService.setShowPincodePopUp(false);
    this.locationService.setPincode(this.pincode)
  }
}
