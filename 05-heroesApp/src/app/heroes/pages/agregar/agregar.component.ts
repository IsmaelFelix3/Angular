import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img{
        width: 100%;
        border-radius:5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  heroe: Heroe ={
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics ,
    alt_img: ''
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]


  constructor(private heroesService:HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog ) { }

  ngOnInit(): void {
    // se aconseja que aqui en el on init se hagan las peticiones para que la aplicacion se contruya y 
    // a su ves baya haciendo las peticiones http
    

    // verifica si viene editar en la url si no es asi se va a agregar 
    // si lo trae se va a editar
    if(!this.router.url.includes('editar'))
    {
      return;
    }

    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.heroesService.getHeroePorId(id) )
    )
    .subscribe( heroe => this.heroe = heroe);
  }

  guardar()
  {
    if(this.heroe.superhero.trim().length === 0)
    {
      return;
    }

    if(this.heroe.id)
    {
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => this.mostrarSnackBar('Registro actualizado'))
    }
    else
    {
      this.heroesService.agregatHeroe(this.heroe).subscribe( heroe => { 
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro creado');
      })
    }
  }

  borrarHeroe()
  {

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      // mucha gente se siente insegura de mandar la data porque en js todo se manda por referencia y si mandas el
      // objeto puede llegar a modificarse y eso no queremos para eso podemos usar el operador spread {... this.heroe}
      // en este caso no porque ya sabemos que no vamos a modificar nada
      data: this.heroe
    } );

    dialog.afterClosed().subscribe( (result) => {
      if(result)
      {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe( resp => {
          this.router.navigate(['/heroes']);
        });
      }
    } )
  }

  mostrarSnackBar(mensaje: string): void
  {
    // las acciones del open son los nombres de los botones que tendra
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    });
  }

}
