import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-permission-modal',
  templateUrl: './user-permission-modal.component.html',
  styleUrls: ['./user-permission-modal.component.css']
})
export class UserPermissionModalComponent {
    @Output() permissionGranted = new EventEmitter<boolean>();
  
    grantPermission() {
      this.permissionGranted.emit(true);
    }
  
    denyPermission() {
      this.permissionGranted.emit(false);
    }
  }