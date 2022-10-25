import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    ServicesModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
