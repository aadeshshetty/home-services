import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!:string;
  password!:string;
  constructor(private apiService:ApiService,private router: Router,private userService:UserService, private toaster: ToastrService){
  }
  login(){
    if(this.email && this.password){
      this.apiService.login(this.email,this.password).subscribe({
        next : (data:any)=>{        
        if(data.type && data.type==='success'){
          this.toaster.success(data?.message,'Login',{timeOut:3000})
          sessionStorage.setItem('token',data.data.token)
          this.userService.setUserId(data?.data?.userId)
          this.userService.setIsLoggedIn(true)
          this.router.navigate(['home'])
        }else{
          this.toaster.error(data?.message,'Login',{timeOut:3000})
          }
        },
        error:(error)=>{
          this.toaster.error(error?.error?.message,'Login',{timeOut:3000})
        }
      })

    }
  }
}
