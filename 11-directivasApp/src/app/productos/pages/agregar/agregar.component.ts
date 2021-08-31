import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: []
})
export class AgregarComponent implements OnInit {

  texto1 : string = 'Fernando Herrera'
  color: string = 'green';

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required]
  });

  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  tieneError(campo: string): boolean
  {
    return this.miFormulario.get(campo)?.invalid || false;
  }

  cambiarMensaje()
  {
    this.texto1 = Math.random().toString();
  }

  cambiarColor()
  {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    this.color = color;
  }
}
