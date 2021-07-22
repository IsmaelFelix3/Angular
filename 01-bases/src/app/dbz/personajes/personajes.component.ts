import { Component, Input } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html'
})
export class PersonajesComponent
{
  constructor(private DbzService: DbzService)
  {

  }
  //con poner el input le decimos a angular hey este input (personajes) van a venir desde el componente padre
  //osea quien lo utilice me puede mandar la propiedad de personajes

  // ai yo quiero que personajes externamente tenga otro nombre lo puedo poner en el input con ''
  // @Input('data') personajes: any[]=[];
  // @Input() personajes: Personaje[]=[];

  get personajes()
  {
    return this.DbzService.personajes;
  }

}
