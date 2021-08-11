import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { paisSmall } from '../../interfaces/paises.interface';

import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: []
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['',[Validators.required] ],
    pais: ['', [Validators.required] ],
    frontera: ['',[Validators.required] ]
  })

  // llenar selectores
  regiones: string[] = [];
  paises: paisSmall [] = [];
  // fronteras: string[] = [];
  fronteras: paisSmall[] = [];


  // UI
  cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void 
  {
    this.regiones = this.paisesService.regiones;
    // // caundo cambie la region

    // this.miFormulario.get('region')?.valueChanges.subscribe( region => {
    //   console.log(region);

    //   this.paisesService.getPaisesPorRegion(region).subscribe( paises => {
    //     this.paises = paises;
    //     console.log(this.paises);
    //   })
    // })

  // para implementar un operador de rxjs eso se hace con el pipe, el pipe me ayuda a mi a transformar un valor
  // que venga en el get, no solo transformarlo tambien cambiar otras cosas mediante el switch map, disparar efectos
  // secundarios mediante el tap, mutar la info con el map 

  // dentro del switch map tenemos el valor producto del observable get valuechanges y esto debe de regrear un nuevo
  // observable
  // cuando no interesa lo que viene se poner ( _ ) es una nomenclatura standart
    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap( (_) => {
        this.miFormulario.get('pais')?.reset('');
        this.cargando = true;
      } ),
      switchMap( region => this.paisesService.getPaisesPorRegion( region ) )
    )
    .subscribe( paises => {
      this.cargando = false;
      this.paises = paises;

    
    })

    // cuando cambia el pais
    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap( () => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
      }),
      switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo)),
      switchMap( pais => this.paisesService.getPaisesPorCodigos(pais?.borders!))
    )
    // el error era porque el servicio puede regresar null
    .subscribe( paises => {
          // this.fronteras = pais?.borders;
          this.fronteras = paises;
          this.cargando = false;
        }
    );

  }

  guardar()
  {
    console.log(this.miFormulario.value);
  }

  


}
