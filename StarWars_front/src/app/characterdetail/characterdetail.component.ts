import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Planet } from '../planets/planets';
import { PlanetsService } from '../planets/planets.service';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Film } from '../film/film';
import { FilmService } from '../film/film.service';
import { Character } from '../character/character';
import { Starship } from '../starship/starship';
import { CharacterService } from '../character/character.service';
import { StarshipService } from '../starship/starship.service';

@Component({
  selector: 'app-characterdetail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './characterdetail.component.html',
  styleUrl: './characterdetail.component.css',
  providers: [HttpClient, PlanetsService, CharacterService, FilmService, CharacterService, StarshipService]
})
export class CharacterdetailComponent {
  characterName!: string;
  character!: Character;
  homeworld!: Planet;
  films!: Film[];
  starships!: Starship[];

  constructor(private route: ActivatedRoute, private characterService: CharacterService, private filmService: FilmService, private planetService: PlanetsService, private starshipService: StarshipService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.characterName = params.get('name') ?? '';
      // console.log(this.planetName)
    });
    this.characterService.getCharacter(this.characterName).subscribe((data) => {
      // console.log(data.results[0])
      this.character = data.results[0]
      console.log(this.character)
      // console.log(this.planet.films)
      this.getPlanet(this.character.homeworld)
      this.getFilmsDetail(this.character.films)
      this.getStarships(this.character.starships)
    })

  }

  getPlanet(planetUrl: string){
    this.planetService.getPlanetById(planetUrl).subscribe((data) => {

      this.homeworld = data
      console.log(this.homeworld)
    })
  }

  getFilmsDetail(filmsUrls: string[]){
    const films: Observable<Film>[] = filmsUrls.map(url => this.filmService.getFilm(url));

    forkJoin(films).subscribe(data => {
      this.films = data;
      // console.log(this.films)
    })
  }

  getStarships(starshipsUrls: string[]){
    const starships: Observable<Starship>[] = starshipsUrls.map(url => this.starshipService.getStarshipById(url));

    forkJoin(starships).subscribe(data => {
      this.starships = data;
    })
  }

}
