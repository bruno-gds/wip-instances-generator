import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {rxStompServiceFactory} from "./service/stomp/rx-stomp-service-factory";
import {RxStompService} from "./service/stomp/rx-stomp.service";
import {QRCodeModule} from "angularx-qrcode";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule
  ],
  providers: [
    { provide: RxStompService, useFactory: rxStompServiceFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
