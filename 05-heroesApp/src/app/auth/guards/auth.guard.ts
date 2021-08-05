import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate,CanLoad {

  constructor(private authService: AuthService,
              private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // si esto es true debo dejar que siga sino usar el router para devovlerlo al log in
      return this.authService.verificaAutenticacion().
      pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado)
          {
            this.router.navigate(['./auth/login']);
          }
        })
      );
      
      // if(this.authService.auth.id)
      // {
      //   return true;
      // }

      // console.log('bloqueado por el auth guard can activate');
      // return false;
  }

  //en pocas palabras lo que digo aqui es que el can load siempre va a regresar un true 

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if(!estaAutenticado)
            {
              this.router.navigate(['./auth/login']);
            }
          })
        );
      // console.log('canLoad', false);
      // console.log(route);
      // console.log(segments);
      // if(this.authService.auth.id)
      // {
      //   return true;
      // }

      // console.log('bloqueado por el auth guard can load');
      // return false;

      
  }
}
