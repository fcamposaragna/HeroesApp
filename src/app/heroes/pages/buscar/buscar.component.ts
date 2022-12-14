import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencia(this.termino.trim())
      .subscribe(heroes=>this.heroes = heroes);
  }

  opcionSeleccionada(evento: MatAutocompleteSelectedEvent){

    if(!evento.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = evento.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHero(heroe.id!)
      .subscribe(heroe=> this.heroeSeleccionado = heroe)
  }

}
