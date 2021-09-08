import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad { 
  constructor( private authService: AuthService,
               private router: Router){}
  // se pone en ambos el validar ya que es la misma condicion para activarlo y cargarlo

  canActivate(): Observable<boolean> | boolean
  {
    console.log('can Activate');
    return this.authService.validarToken()
    .pipe(
      tap( valid => {
        if(!valid)
        {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }

  canLoad(): Observable<boolean>| boolean 
  {
    console.log('can Load');
    return this.authService.validarToken()
    .pipe(
      tap( valid => {
        if(!valid)
        {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
