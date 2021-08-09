import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

// si nos interesa algo que tiene una referencia local simplemente necesitamos el nombre de la referencia local
// y le ponemos un nombre a esa propiedad
// esto se inicializa despues del ngOnInit etonces le decimos ! confia en mi siempre vas a tener un valor asi
  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'Funko',
    precio: 300,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  // guardar(miFormulario: NgForm)
  guardar()
  {
    // console.log('Submit hecho', this.miFormulario.value);
    console.log('Posteo exitoso');
    // en el reset puedo mandar un objeto con los valores que quiero que tenga por defecto
    this.miFormulario.resetForm({
      producto: 'Algo',
      precio: 0,
      existencias: 0
    });
  }

  // se le puso ? a formulario porque en su momento todavia no se a terminado de inicializar
  //  y ts lo adviertio en el view child
  // si tenemos el formulario que siga evaluando lo demas

  nombreValido(): boolean
  {
   return this.miFormulario?.controls.producto?.invalid && 
          this.miFormulario?.controls.producto?.touched
  }

  precioValido(): boolean
  {
    // se debe de mostrar si el valor es menor a cero
    return this.miFormulario?.controls.precio?.value < 0 && 
           this.miFormulario?.controls.precio?.touched
          //  busca que el valor sea mayor a 0 , investigar porque el <= no jalaba con el 0 pero el < si
  }

}
