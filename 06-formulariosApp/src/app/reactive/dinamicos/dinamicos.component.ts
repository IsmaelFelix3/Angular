import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  

  constructor(private fb: FormBuilder) { }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['' ,[Validators.required,Validators.minLength(3)]],
    // adentro del array debo de definir cada uno de los elementos de los que va a consistir o que van a estar
    // aqui adentro puedo poner favoritos: this.fb.array( [], validators,required  ) el form array va a ser un arreglo y 
    // lo estoy obligando, aqui dentro debe ser un arreglo de form controls 
    favoritos: this.fb.array( [
      // estos no son arreglos adentro del form array tenemos nuestro arreglo y los de adentro son colecciones de form controls
      // por lo cual aqui se pueden especificar validaciones
      [ 'Halo', Validators.required ],
      [ 'Resident Evil', Validators.required ]
    ], Validators.required )
  });

  // para crear un control puede ser de cualquiera de las dos maneras usando el fb o el form control
  // nuevoFavorito: FormControl = this.fb.control
  // nuevoFavorito: FormControl = new FormControl();

  // entienda como control un input, un check cualquier cosa un valor nuevo del formulario
  // aqui debo especificar el valor inicial y tambien puedo especificar los validadores
  // un form control no es solo el valor es todo el control
  nuevoFavorito: FormControl = this.fb.control('', Validators.required)


  get favoritosArr()
  {
    // con el get se puede agarrar un control propiamente 
    // simplemrente le digo que esto this.miFormulario.get('favoritos') es un FormArray
    return this.miFormulario.get('favoritos') as FormArray;
  }

  ngOnInit(): void {
  }

  campoEsValido(campo: string)
  {
    return this.miFormulario.controls[campo].touched && this.miFormulario.controls[campo].errors
  }

  guardar(){
    if(this.miFormulario.invalid)
    {
      this.miFormulario.markAllAsTouched();
      return;
    }
    
    console.log(this.miFormulario.value);
  }

  borrar(index : number)
  {
    this.favoritosArr.removeAt(index);
    
  }

  agregarFavorito()
  {
    if(this.nuevoFavorito.invalid)
    {
      return;
    }
    // no se recomienda mandar el objeto directo ya que puede causar conflicto porque se mantiene la referencia 
    // tomamos el valor de nuevo favorito y creamos un elemento en favoritos
  //  ((this.miFormulario.controls.favoritos) as FormArray).push();

  // usamos favoritos array porque apunta al mismo objeto
  // se necesita mandar un form control
    this.favoritosArr.push( this.fb.control(this.nuevoFavorito.value, Validators.required));

    // tambien se puede usar asi sin el form builder
    // this.favoritosArr.push( new FormControl(this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset();
  }

}
