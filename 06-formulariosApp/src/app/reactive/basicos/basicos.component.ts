import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit
{
  // definimos el onbjeto
  // tengo un control que se llama nombre y un formulario que es del tipo formGroup
  // miFormulario: FormGroup = new FormGroup({
  //   // entre parentesis se especifica el valor que va a tener
  //   // es opcional ponerle comillas '' al nombre funciona igual sin ellas
  //   // 'nombre': new FormControl('RTX 4080ti')
  //   nombre: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(5)
  // }); 


  miFormulario: FormGroup = this.fb.group({
    // se define como un arreglo porque despues vienen validaciones y luego validaciones asincronas
    //  [value,validaciones Sincronas,validacionesAsync]
    nombre: [ , [Validators.required, Validators.minLength(3)] ],
    precio: [ ,[ Validators.min(0),Validators.required] ],
    existencias: [ , [Validators.min(1),Validators.required] ]
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit()
  {
    this.miFormulario.reset({
      nombre: 'Funko Goku',
      precio: 100
    })
  }

  campoEsValido(campo: string)
  {
    // esto no es de angular es propio de js
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar()
  {
    if(this.miFormulario.invalid)
    {
      this.miFormulario.markAllAsTouched();
      
    }
    console.log(this.miFormulario.value);

    this.miFormulario.reset();

    
  }

}
