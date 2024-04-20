import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Planet } from '../planets';
import { PlanetsService } from '../planets.service';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Film } from '../film';
import { FilmService } from '../film.service';
import { CharacterService } from '../character.service';
import { Character } from '../character';

@Component({
  selector: 'app-planetdetail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './planetdetail.component.html',
  styleUrl: './planetdetail.component.css',
  providers: [HttpClient, PlanetsService, CharacterService, FilmService]
})
export class PlanetdetailComponent {

  planetName!: string;
  planet!: Planet;
  people!: Character[];
  films!: Film[];

  constructor(private route: ActivatedRoute, private planetService: PlanetsService, private characterService: CharacterService, private filmService: FilmService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.planetName = params.get('name') ?? '';
      // console.log(this.planetName)
    });
    this.planetService.getPlanet(this.planetName).subscribe((data) => {
      this.planet = data.results[0]
      // console.log(this.planet.films)
      this.getPeopleDetail(this.planet.residents)
      console.log(this.people)
      this.getFilmsDetail(this.planet.films)
    })
    
    
  }

  getPeopleDetail(residentsUrls: string[]){
    const residentsObservables: Observable<Character>[] = residentsUrls.map(url => this.characterService.getCharacterById(url));

    forkJoin(residentsObservables).subscribe(residentsDetails => {
      this.people = residentsDetails;
      console.log(this.people)
    });
  }
  
  getFilmsDetail(filmsUrls: string[]){
    const films: Observable<Film>[] = filmsUrls.map(url => this.filmService.getFilm(url));

    forkJoin(films).subscribe(data => {
      this.films = data;
      // console.log(this.films)
    })
  }
}
