import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit{
  password: string = ""
  confirmPassword: string = ""
  userId!:string

  constructor(private router: Router,private apiServcie:ApiService,private useService:UserService){}

  ngOnInit(): void {
    this.useService.getUserId().subscribe((id)=>this.userId = id)
  }

  submitPassword(){
    if (this.password === this.confirmPassword) {
      this.apiServcie.setPassword(this.userId,this.password).subscribe((data:any)=>{
        if(data.type==="success")
          this.useService.setIsLoggedIn(true)
          this.router.navigate(['home']);
      })
    } else {
      alert("Passwords don't match!");
    }
  }
}
