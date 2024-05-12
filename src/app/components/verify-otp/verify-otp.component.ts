import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit{
  otp: any;
  userId!: string;
  config = {
    allowNumbersOnly: true,
    length: 6,
    disableAutoFocus: false,
    inputStyles: {
      'width': '3rem',
      'height': '3rem',
    }
  }

  constructor(private router: Router,private apiService:ApiService,private userService:UserService,private toaster: ToastrService){}

  ngOnInit(): void {
    this.userService.getUserId().subscribe((id)=>{
      this.userId = id
  })
  }

  onOtpChange(otp:string){
    this.otp = otp;
  }

  verifyOTP(){
    this.apiService.verifyOtp(this.userId,this.otp).subscribe({
      next:(data:any)=>{
      if(data.type === "success"){
        this.toaster.success(data?.message,'Otp',{timeOut:3000})
          this.userService.setUserId(data?.data?.userId)
      this.router.navigate(['set-password'])
      }else{
        this.toaster.error(data?.message,'Otp',{timeOut:3000})
      }
    },
    error:(error:any)=>{
      this.toaster.error(error?.message,'Otp',{timeOut:3000})
    }
  })
  }
}
