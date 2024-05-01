import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { CartComponent } from './components/cart/cart.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { UserPermissionModalComponent } from './components/user-permission-modal/user-permission-modal.component'
import { HttpClientModule } from '@angular/common/http';
import { PincodeModalComponent } from './components/pincode-modal/pincode-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    ServiceListComponent,
    UserPermissionModalComponent,
    PincodeModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
