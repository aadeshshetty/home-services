import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'verify-otp',
    component:VerifyOtpComponent
  },
  {
    path:'set-password',
    component:SetPasswordComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'services/:serviceName',
    component: ServiceListComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
