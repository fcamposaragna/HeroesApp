import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles:[`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {


heroe: Heroe = {
  superhero: '',
  alter_ego: '',
  characters: '',
  first_appearance: '',
  publisher: Publisher.DCComics,
  alt_img: ''
}
  publishers=[
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  constructor(
    private heroesService: HeroesService,
    private activatedRouter: ActivatedRoute,
    private route : Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    if(!this.route.url.includes('editar')){
      return;
    }

    this.activatedRouter.params
    .pipe(
      switchMap(({id})=> this.heroesService.getHero(id))
    )
    .subscribe( heroe=> this.heroe = heroe);
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0) return;

    if(this.heroe.id){
      //Actualizar heroe
      this.heroesService.putHero(this.heroe)
        .subscribe(heroe=> this.mostrarSnackbar('Registro actualizado'));

    }else{
      //Crea
      this.heroesService.postHero(this.heroe)
        .subscribe(heroe=>{
          this.route.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackbar('Registro actualizado');
        })
    }
  }

  borrarHeroe(){

    this.dialog.open(ConfirmarComponent, {
      width: '250px'
    })
    
    // this.heroesService.deleteHero(this.heroe.id!)
    //   .subscribe(resp=>{
    //     this.route.navigate(['/heroes'])
    //   })
  }

  mostrarSnackbar (mensaje:string){
    this._snackBar.open(mensaje, 'Entendido!', {
      duration: 2500
    })
  }

}
