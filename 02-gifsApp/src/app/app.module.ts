import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

// si no importamos el modulo solo va a flotar hay pero necesitamos decirle a angular que dispone de este modulo
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';

// usualmente el http lo van a importar de manera global, casi siempre 

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    GifsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
