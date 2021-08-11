import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';

import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent implements OnInit
{

  // el mensaje de error lo tenemos mediante un getter de manera condicional y este getter se va a ejecutar cada ves 
  // que angular detecte un cambio en el componente
  get emailErrorMsg(): string
  {
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required)
    {
      return 'Email es obligatorio';
    }
    else if(errors?.pattern)
    {
      return 'El valor ingresado no tiene formato de correo';
    }
    else if(errors?.emailTomado)
    {
      return 'El email ya fue utilizado';
    }

    return '';
  }
  ngOnInit()
  {
    this.miFormulario.reset({
      nombre: 'Ismael Felix',
      email: 'test1@test.com',
      username: 'Lone Wolf',
      password: '123456',
      password2: '123456'
    });
  }

  constructor(private fb: FormBuilder, 
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  miFormulario: FormGroup = this.fb.group({
    nombre:['',[Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    // no me jalaba sin los corchetes la validacion asincrona
    email: ['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator] ],
    // aqui no se ejecuta la funcion, se manda la referencia por eso no se pone ()
    // si se utilizaran validaciones asincronas que no requieran una peticion http se pueden poner aqui (siempre y cuando regresen una promesa o un observable)
    // si no se necesita realizar diferente con las nuevas normas de angular
    username: ['' ,[Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]]
  },{
    // este objeto son opciones que le podemos mandar al form group
    // aqui podemos definir todas las validaciones que queremos que se le apliquen a todo el formulario
    // si vamos definir solo usa no se necesitan los corchetes
    // lo dificil es leeer en tiempo real los datos de los controles
    validators: [ this.validatorService.camposIguales('password','password2') ]
  });
  

  campoNoValido(campo: string)
  {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  submitFormulario()
  {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }




}
