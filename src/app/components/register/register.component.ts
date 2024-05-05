import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email!: string;
  name!:string;
  constructor(private router: Router, private apiServcie:ApiService, private user:UserService){}
  sendOtp(){
    if(this.email && this.name){
      this.apiServcie.getOtpOnEmail(this.email,this.name).subscribe((data:any)=>{
        if(data.type === "success"){
        this.user.setUserId(data.data.userId)
        this.router.navigate(['verify-otp'])
        }
      })
    }
  }
}
