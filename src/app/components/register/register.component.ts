import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private router: Router, private apiServcie:ApiService, private user:UserService,private toaster: ToastrService){}
  sendOtp(){
    if(this.email && this.name){
      this.apiServcie.getOtpOnEmail(this.email,this.name).subscribe({
        next:(data:any)=>{
        if(data.type === "success"){
          this.toaster.success(data?.message,'Register',{timeOut:3000})
        this.user.setUserId(data.data.userId)
        this.router.navigate(['verify-otp'])
        }else{
          this.toaster.error(data?.message,'Register',{timeOut:3000})
        }
      },
      error:(error:any)=>{
        this.toaster.error(error?.message,'Register',{timeOut:3000})
      }
    })
    }
  }
}
