import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

 // no podemos recibir la informacion por un input porque no lo estamos llamando desde el html y no es esa la manera en que 
//  la gente de angular material lo definiio, lo definieron con la inyeccion de un servicio especial que es para leer la data
// que viene desde el padre

// en el ultimo 'DialogData' es el tipo de data que es

 //Marca error porque necesito especificarle el tipo 
  constructor( private dialogRef:MatDialogRef<ConfirmarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Heroe) { }

  //estamos leyendo quien se que mande el dialog y la data va a ser alamacenada en la propiedad data y 
  // esa data yo se que va a ser de tipo heroe, la data es publica y la puedo usar en el html, si fuera privada
  // no podria usarla en el html


  ngOnInit(): void {
  }

  borrar()
  {
    this.dialogRef.close(true);
  }
  cerrar()
  {
    this.dialogRef.close();
  }
}
