// navegador web por eso import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HeroesModule } from './heroes/heroes.module';
import { ContadorModule } from './contador/contador.module';
import { DbzModule } from './dbz/dbz.module';


@NgModule({

  // declaraciones usualmente aqui es donde vamos a colocar componentes
  declarations: [
    AppComponent
  ],
  //imports usualmente aqui vamos a colocar otros modulos
  imports: [
    BrowserModule,
    HeroesModule,
    ContadorModule,
    DbzModule
  ],
  //providers son mas servicios especificos a un modulo
  providers: [],
  //el bootstrap usualmente solo se colocara una ves y aqui en el componente principal
  bootstrap: [AppComponent]
})
export class AppModule { }
