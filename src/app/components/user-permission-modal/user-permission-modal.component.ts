import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-permission-modal',
  templateUrl: './user-permission-modal.component.html',
  styleUrls: ['./user-permission-modal.component.css']
})
export class UserPermissionModalComponent implements OnInit{
    @Output() permissionGranted = new EventEmitter<boolean>();
    showPopUp: boolean = true;
  
    constructor(private router: Router){}

    ngOnInit(): void {
      this.router.events.subscribe((data:any)=>{
        if(data.url)
        this.showPopUp = data.url.includes('/register') || data.url.includes('/login') || data.url.includes('/verify-otp')
        || data.url.includes('/set-password')
      })
    }

    grantPermission() {
      this.permissionGranted.emit(true);
    }
  
    denyPermission() {
      this.permissionGranted.emit(false);
    }
  }