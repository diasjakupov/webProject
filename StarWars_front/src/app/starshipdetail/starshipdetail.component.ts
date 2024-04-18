import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Film } from '../film';
import { FilmService } from '../film.service';
import { Starship } from '../starship';
import { StarshipService } from '../starship.service';
import { CharacterService } from '../character.service';
import { Character } from '../character';

@Component({
  selector: 'app-starshipdetail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './starshipdetail.component.html',
  styleUrl: './starshipdetail.component.css',
  providers: [HttpClient, StarshipService, CharacterService, FilmService]
})
export class StarshipdetailComponent {
  starshipName!: string;
  starship!: Starship;
  pilots!: Character[];
  films!: Film[];

  constructor(private route: ActivatedRoute, private starshipService: StarshipService, private characterService: CharacterService, private filmService: FilmService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.starshipName = params.get('name') ?? '';
      // console.log(this.planetName)
    });
    this.starshipService.getStarship(this.starshipName).subscribe((data) => {
      this.starship = data.results[0]
      // console.log(this.planet.films)
      this.getPeopleDetail(this.starship.pilots)
      // console.log(this.people)
      this.getFilmsDetail(this.starship.films)
    })
  }

  getPeopleDetail(residentsUrls: string[]){
    const residentsObservables: Observable<Character>[] = residentsUrls.map(url => this.characterService.getCharacterById(url));

    forkJoin(residentsObservables).subscribe(residentsDetails => {
      this.pilots = residentsDetails;
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
