import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})

export class SwitchesComponent implements OnInit{

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void 
  {
    this.miFormulario.reset(
      // tambien podemos hacer esto para que siempre tenga un valor
      {
        ...this.persona,
        condiciones: true
      }
      );

      // para dejarlo sincronizado
      // y desestructurado extraigo las condiciones en una variable independiente y las demas caen en el rest con el
      // operador rest
      this.miFormulario.valueChanges.subscribe( ({condiciones, ...restoDeArgumentos}) => {
        this.persona = restoDeArgumentos;
      })

      // seleccionar solo un control especifico
      // this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
      //   console.log(newValue);
      // });
  }

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  guardar()
  {
    const formValue = { ...this.miFormulario.value };
    // esto es propio de js
    delete formValue.condiciones;
    console.log(formValue);

    this.persona = formValue;
  }

}
