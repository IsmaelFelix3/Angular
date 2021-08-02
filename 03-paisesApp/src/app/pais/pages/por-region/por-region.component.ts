import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent 
{

  regiones: string[] = ['africa','americas','asia','europe','oceania'];
  regionActiva:string = '';
  paises: Country[]=[];
  hayError: boolean = false;

  constructor(private paisService: PaisService) { }

  activarRegion( region:string )
  {
    if( region === this.regionActiva) { return;}
 
    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarPorRegion(region)
    .subscribe( paises => this.paises = paises);
  }
  
  getClaseCss( region: string )
  {
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }


}
