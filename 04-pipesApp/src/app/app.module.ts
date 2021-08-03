import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// esto hay que importarlo si importamos algun componente de prime ng que tiene alguna animacion
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app-router.module';
import { VentasModule } from './ventas/ventas.module';

// cambiar local de la app
import  LocaleEs  from "@angular/common/locales/es-HN";
import  LocaleFr  from "@angular/common/locales//fr";
import { registerLocaleData } from "@angular/common";



registerLocaleData(LocaleEs);
registerLocaleData(LocaleFr);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRouterModule,
    VentasModule
  ],
  providers: [
    {
      // aqui transforma el local de la aplicacion al que se selecciono
      provide: LOCALE_ID, useValue: 'es-HN'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
