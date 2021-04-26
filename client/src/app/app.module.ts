import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
